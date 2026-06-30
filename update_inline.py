#!/usr/bin/env python3
"""Update inline style blocks in all unit pages with richer design."""
import re, glob, os

BASE = "D:/意大利语材料/Nuovo espresso/Nuovo Espreso 1/"

NEW_INLINE = """  <style>
    body { background: var(--ne-bg); }
    .unit-hero { background: radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,230,241,0.5) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 30% 100%, rgba(254,249,231,0.7) 0%, transparent 50%), linear-gradient(180deg, #FEF9E7 0%, #FFF 50%, #FDFCFB 100%); padding: 110px 24px 40px; text-align: center; position: relative; overflow: hidden; }
    .unit-hero::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 5px; background: linear-gradient(90deg, var(--ne-gold), var(--ne-orange), var(--ne-red)); }
    .unit-hero h1 { font-family: var(--font-serif); font-size: clamp(32px, 5vw, 48px); font-weight: 800; margin: 8px 0; background: linear-gradient(135deg, var(--ne-blue), var(--ne-blue-bright)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .page-section { max-width: 960px; margin: 0 auto; padding: 32px 24px; }
    .page-section h2 { font-family: var(--font-serif); font-size: 24px; font-weight: 800; color: var(--ne-blue); margin-bottom: 14px; display: flex; align-items: center; gap: 10px; border-bottom: 3px solid var(--border-light); padding-bottom: 8px; position: relative; }
    .page-section h2::after { content: ""; position: absolute; bottom: -3px; left: 0; width: 120px; height: 3px; background: linear-gradient(90deg, var(--ne-gold), var(--ne-orange), var(--ne-red)); border-radius: 0 0 3px 3px; }
    .page-section h3 { font-size: 17px; font-weight: 700; color: var(--ne-orange); margin: 18px 0 8px; }
    .dialog-table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 14px; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
    .dialog-table td { padding: 8px 12px; border-bottom: 1px solid var(--border-light); vertical-align: top; }
    .dialog-table tr:last-child td { border-bottom: none; }
    .dialog-table tr:nth-child(even) td { background: rgba(254,249,231,0.4); }
    .dialog-table tr:hover td { background: rgba(254,249,231,0.8); }
    .dialog-table .it { font-weight: 600; cursor: pointer; border-bottom: 1px dashed #ddd; color: var(--ne-dark); transition: all 0.2s; }
    .dialog-table .it:hover { background: #fff3cd; color: var(--ne-red); }
    .dialog-table .zh { color: var(--ne-muted); font-size: 13px; font-style: italic; }
    .vocab-table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 14px; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
    .vocab-table th { background: linear-gradient(135deg, var(--ne-light-blue), #D6EAF8); color: var(--ne-blue); padding: 9px 14px; font-weight: 700; font-size: 12px; text-align: left; text-transform: uppercase; letter-spacing: 0.5px; }
    .vocab-table td { padding: 8px 14px; border-bottom: 1px solid var(--border-light); }
    .vocab-table tr:last-child td { border-bottom: none; }
    .vocab-table tr:nth-child(even) td { background: rgba(212,230,241,0.15); }
    .vocab-table .it { cursor: pointer; border-bottom: 1px dashed #ddd; font-weight: 600; transition: all 0.2s; }
    .vocab-table .it:hover { background: #fff3cd; color: var(--ne-red); }
    .grammar-box { background: linear-gradient(135deg, #FFF 0%, #FAF8F5 100%); border: 1px solid var(--border-light); border-radius: 14px; padding: 18px; margin: 14px 0; box-shadow: 0 3px 15px rgba(0,0,0,0.05); position: relative; overflow: hidden; }
    .grammar-box::before { content: ""; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: linear-gradient(180deg, var(--ne-gold), var(--ne-orange), var(--ne-red)); border-radius: 14px 0 0 14px; }
    .grammar-box table { width: 100%; border-collapse: collapse; font-size: 14px; margin: 8px 0; }
    .grammar-box th { background: linear-gradient(135deg, rgba(254,249,231,0.8), rgba(253,235,208,0.4)); padding: 8px 12px; font-weight: 700; font-size: 12px; text-align: left; border-bottom: 2px solid var(--ne-gold-dark); color: var(--ne-blue); }
    .grammar-box td { padding: 8px 12px; border-bottom: 1px solid var(--border-light); }
    .grammar-box tr:last-child td { border-bottom: none; }
    .grammar-box tr:nth-child(even) td { background: rgba(254,249,231,0.3); }
    .grammar-box .verb { color: var(--ne-red); font-weight: 700; }
    .cultura-box { background: linear-gradient(135deg, var(--ne-cream) 0%, #FFF 100%); border: 1px solid var(--ne-gold-dark); border-radius: 14px; padding: 18px 20px; margin: 14px 0; box-shadow: 0 3px 15px rgba(212,172,13,0.08); position: relative; overflow: hidden; }
    .cultura-box::before { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, var(--ne-gold), var(--ne-orange)); border-radius: 14px 14px 0 0; }
    .cultura-box .it { font-style: italic; cursor: pointer; line-height: 1.8; }
    .cultura-box .it:hover { background: rgba(241,196,15,0.1); }
    .cultura-box .zh { color: var(--ne-muted); font-size: 14px; line-height: 1.8; }
    .nav-buttons { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; padding: 24px 24px 8px; }
    .nav-buttons a { display: inline-flex; align-items: center; gap: 6px; padding: 10px 22px; background: linear-gradient(135deg, var(--ne-red), var(--ne-red-dark)); color: #fff; border-radius: 100px; text-decoration: none; font-weight: 600; font-size: 14px; transition: all 0.25s; box-shadow: 0 3px 12px rgba(192,57,43,0.25); }
    .nav-buttons a:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(192,57,43,0.35); }
    .nav-buttons .home-btn { background: linear-gradient(135deg, var(--ne-blue), var(--ne-blue-dark)); box-shadow: 0 3px 12px rgba(26,82,118,0.25); }
    .nav-buttons .home-btn:hover { box-shadow: 0 6px 20px rgba(26,82,118,0.35); }
    .alphabet-table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 14px; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
    .alphabet-table th { background: linear-gradient(135deg, var(--ne-cream), #FDEBD0); padding: 8px 12px; font-weight: 700; font-size: 12px; text-align: left; border-bottom: 2px solid var(--ne-gold-dark); }
    .alphabet-table td { padding: 8px 12px; border-bottom: 1px solid var(--border-light); cursor: pointer; transition: all 0.2s; }
    .alphabet-table tr:last-child td { border-bottom: none; }
    .alphabet-table td:hover { background: rgba(241,196,15,0.15); color: var(--ne-red); }
    .alphabet-table .foreign { color: var(--ne-muted); font-size: 12px; font-style: italic; }
    @media (max-width: 768px) { .page-section { padding: 24px 16px; } }
  </style>"""

# Replace inline style in content pages
pages = [
    "unita-1.html", "unita-2.html", "unita-3.html", "unita-4.html",
    "unita-5.html", "unita-6.html", "unita-7.html", "unita-8.html",
    "unita-9.html", "unita-10.html", "facciamo-punto.html",
    "grammatica-riassuntiva.html", "eserciziario.html"
]

for fname in pages:
    path = BASE + fname
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the old inline style block (from <style> to </style>)
    match = re.search(r'<style>.*?</style>', content, re.DOTALL)
    if match:
        old_style = match.group(0)
        # Replace with new style
        new_content = content.replace(old_style, NEW_INLINE)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated: {fname}')
    else:
        print(f'Skipped: {fname} - no <style> found')
