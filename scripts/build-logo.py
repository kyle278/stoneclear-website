from pathlib import Path
from PIL import Image
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
import math, urllib.request

# Source: existing client fan artwork; lettering: Archivo 900 (SIL OFL).
# Reproducible from the tracked client logo and official Google Fonts source.
font_path = Path("research/Archivo.ttf")
if not font_path.exists():
 font_path.parent.mkdir(exist_ok=True)
 font_path.write_bytes(urllib.request.urlopen("https://raw.githubusercontent.com/google/fonts/main/ofl/archivo/Archivo%5Bwdth,wght%5D.ttf").read())
# Redraw the original ten fan blades with clean Bezier edges rather than raster stairs.
# Geometry follows the existing client mark in public/stoneclear/logo.png.
paths = [
 'M309 152 L336 157 L336 243 Q326 208 309 152 Z',
 'M256 155 L283 158 Q312 211 336 250 Q292 200 256 155 Z',
 'M212 163 L236 163 Q284 218 337 258 Q274 211 212 163 Z',
 'M178 175 L199 173 Q275 228 347 268 Q256 220 178 175 Z',
 'M158 192 L175 188 Q272 237 365 279 Q253 232 158 192 Z',
 'M150 212 L163 206 Q271 253 376 286 Q251 246 150 212 Z',
 'M157 233 L165 227 Q278 268 390 292 Q259 265 157 233 Z',
 'M177 259 L181 250 Q301 286 419 304 Q280 283 177 259 Z',
 'M206 276 L211 274 Q333 301 450 311 Q322 301 212 284 Z',
 'M246 298 L258 298 Q371 315 486 317 Q363 316 257 307 Z',
]
minx,miny,maxx,maxy=150,152,486,317
fan_scale=360/(maxx-minx);fan_height=(maxy-miny)*fan_scale
font=instantiateVariableFont(TTFont('research/Archivo.ttf'),{'wght':900,'wdth':100},inplace=False)
glyphs=font.getGlyphSet();cmap=font.getBestCmap();pen=SVGPathPen(glyphs);bounds=BoundsPen(glyphs);advance=0
for char in 'Stone Clear':
 name=cmap[ord(char)];glyphs[name].draw(TransformPen(pen,(1,0,0,1,advance,0)));glyphs[name].draw(TransformPen(bounds,(1,0,0,1,advance,0)));advance+=font['hmtx'][name][0]
bx,by,bw,bh=bounds.bounds;text_scale=640/(bw-bx);text_height=(bh-by)*text_scale
text_top=fan_height+12;svg_height=text_top+text_height+4
fan=' '.join(paths)
svg=f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 648 {svg_height:.2f}" role="img" aria-labelledby="title"><title id="title">Stone Clear</title><g fill="#1258a4"><g transform="translate(16 0) scale({fan_scale:.6f}) translate({-minx} {-miny})"><path d="{fan}"/></g><g transform="translate({4-bx*text_scale:.3f} {text_top+bh*text_scale:.3f}) scale({text_scale:.6f} {-text_scale:.6f})"><path d="{pen.getCommands()}"/></g></g></svg>'''
Path('public/assets/stone-clear-logo.svg').write_text(svg,encoding='utf-8')
Path('public/assets/stone-clear-symbol.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {maxx-minx} {maxy-miny}" role="img" aria-labelledby="title"><title id="title">Stone Clear symbol</title><path fill="#1258a4" transform="translate({-minx} {-miny})" d="{fan}"/></svg>',encoding='utf-8')
print('Logo viewBox:',648,svg_height,'fan contours:',len(paths),'bytes:',len(svg))
for family in ['archivo','lato']:
 p=Path('public/assets/font-licenses')/(family+'-OFL.txt');p.write_bytes(urllib.request.urlopen('https://raw.githubusercontent.com/google/fonts/main/ofl/'+family+'/OFL.txt').read())
