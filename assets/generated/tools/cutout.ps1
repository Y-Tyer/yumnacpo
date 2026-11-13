param([string]$In, [string]$Out, [string]$Preview)
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;
public static class Cutout {
    // Colour-to-alpha: treats the flat ground colour as transparent and recovers the line colour.
    public static string Run(string inPath, string outPath, string previewPath) {
        using (Bitmap src0 = new Bitmap(inPath))
        using (Bitmap bmp = new Bitmap(src0.Width, src0.Height, PixelFormat.Format32bppArgb)) {
            using (Graphics g = Graphics.FromImage(bmp)) { g.DrawImage(src0, 0, 0, src0.Width, src0.Height); }
            int w = bmp.Width, h = bmp.Height;
            BitmapData d = bmp.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
            byte[] px = new byte[d.Stride * h];
            Marshal.Copy(d.Scan0, px, 0, px.Length);
            // ground colour: median-ish average of a border band
            double sb = 0, sg = 0, sr = 0; long n = 0;
            for (int y = 0; y < h; y++) for (int x = 0; x < w; x++) {
                if (x >= 40 && x < w - 40 && y >= 40 && y < h - 40) continue;
                int i = y * d.Stride + x * 4; sb += px[i]; sg += px[i + 1]; sr += px[i + 2]; n++;
            }
            double bb = sb / n, bg = sg / n, br = sr / n;
            long opaque = 0, partial = 0;
            for (int y = 0; y < h; y++) for (int x = 0; x < w; x++) {
                int i = y * d.Stride + x * 4;
                double b = px[i], gch = px[i + 1], r = px[i + 2];
                double a = Math.Max(Math.Max((bb - b) / bb, (bg - gch) / bg), (br - r) / br);
                // ignore ground noise, then stretch so line cores are fully opaque
                a = (a - 0.035) / (0.30 - 0.035);
                if (a <= 0) { px[i] = 0; px[i + 1] = 0; px[i + 2] = 0; px[i + 3] = 0; continue; }
                if (a > 1) a = 1;
                double ua = Math.Max(a, 0.08);
                px[i]     = Clamp((b - (1 - ua) * bb) / ua);
                px[i + 1] = Clamp((gch - (1 - ua) * bg) / ua);
                px[i + 2] = Clamp((r - (1 - ua) * br) / ua);
                px[i + 3] = (byte)Math.Round(a * 255);
                if (a >= 1) opaque++; else partial++;
            }
            Marshal.Copy(px, 0, d.Scan0, px.Length);
            bmp.UnlockBits(d);
            bmp.Save(outPath, ImageFormat.Png);
            if (!string.IsNullOrEmpty(previewPath)) {
                using (Bitmap pv = new Bitmap(w * 2, h, PixelFormat.Format32bppArgb))
                using (Graphics g = Graphics.FromImage(pv)) {
                    g.FillRectangle(new SolidBrush(Color.FromArgb(0x64, 0x44, 0x73)), 0, 0, w, h);
                    g.FillRectangle(new SolidBrush(Color.FromArgb(0xf2, 0xb8, 0x4b)), w, 0, w, h);
                    g.DrawImage(bmp, 0, 0, w, h); g.DrawImage(bmp, w, 0, w, h);
                    pv.Save(previewPath, ImageFormat.Png);
                }
            }
            return String.Format("ground=({0:F1},{1:F1},{2:F1}) opaque={3} partial={4} size={5}x{6}", br, bg, bb, opaque, partial, w, h);
        }
    }
    static byte Clamp(double v) { return (byte)Math.Max(0, Math.Min(255, Math.Round(v))); }
}
"@
[Cutout]::Run($In, $Out, $Preview)
