import{_ as a,o as n,c as e,a4 as l}from"./chunks/framework.DAe4SYBh.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"goke/common/flash固件大小优化.md","filePath":"goke/common/flash固件大小优化.md"}'),i={name:"goke/common/flash固件大小优化.md"};function p(t,s,o,c,r,_){return n(),e("div",null,[...s[0]||(s[0]=[l(`<ol><li>可执行文件大小优化，收益接近 50%</li></ol><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>upx --best -o multi_cam.upx multi_cam</span></span>
<span class="line"><span>                       Ultimate Packer for eXecutables</span></span>
<span class="line"><span>                          Copyright (C) 1996 - 2026</span></span>
<span class="line"><span>UPX 5.2.0       Markus Oberhumer, Laszlo Molnar &amp; John Reiser    Jun 8th 2026</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        File size         Ratio      Format      Name</span></span>
<span class="line"><span>   --------------------   ------   -----------   -----------</span></span>
<span class="line"><span>   6719112 -&gt;   3332280   49.59%    linux/arm    multi_cam.upx                 </span></span>
<span class="line"><span></span></span>
<span class="line"><span>Packed 1 file.</span></span></code></pre></div><ol start="2"><li>驱动尽量 buildin，内核的压缩率更高</li><li>内核换 xz 压缩算法</li></ol>`,3)])])}const h=a(i,[["render",p]]);export{d as __pageData,h as default};
