import{_ as n,o as a,c as t,a4 as d}from"./chunks/framework.DAe4SYBh.js";const m=JSON.parse('{"title":"启越调屏 PINMUX","description":"","frontmatter":{},"headers":[],"relativePath":"goke/common/启越调屏PINMUX.md","filePath":"goke/common/启越调屏PINMUX.md"}'),p={name:"goke/common/启越调屏PINMUX.md"};function e(l,s,i,x,r,C){return a(),t("div",null,[...s[0]||(s[0]=[d(`<h1 id="启越调屏-pinmux" tabindex="-1">启越调屏 PINMUX <a class="header-anchor" href="#启越调屏-pinmux" aria-label="Permalink to “启越调屏 PINMUX”">​</a></h1><h2 id="_1、pinmux-表" tabindex="-1">1、PINMUX 表 <a class="header-anchor" href="#_1、pinmux-表" aria-label="Permalink to “1、PINMUX 表”">​</a></h2><table tabindex="0"><thead><tr><th>pin name</th><th>pin num</th><th>reg addr</th><th>reg value</th><th>function</th></tr></thead><tbody><tr><td>BL_PCTL</td><td>71</td><td>0x100C0010</td><td>0x1000</td><td>GPIO0_4</td></tr><tr><td>LCD_RESET</td><td>27</td><td>0x112C0044</td><td>0x1A00</td><td>GPIO5_1</td></tr><tr><td>LCD_CS</td><td>28</td><td>0x112C0040</td><td>0x1007</td><td>SPI0_CSN</td></tr><tr><td>LCD_SCL</td><td>29</td><td>0x112C003C</td><td>0x1807</td><td>SPI0_SCLK</td></tr><tr><td>LCD_SDA</td><td>30</td><td>0x112C0038</td><td>0x1807</td><td>SPI0_SDO</td></tr><tr><td>LCD_VS</td><td>25</td><td>0x112C0050</td><td>0x1025</td><td></td></tr><tr><td>LCD_HS</td><td>23</td><td>0x112C004C</td><td>0x1025</td><td></td></tr><tr><td>LCD_DE</td><td>24</td><td>0x112C0054</td><td>0x1025</td><td></td></tr><tr><td>LCD_CLK</td><td>22</td><td>0x112C0048</td><td>0x1065</td><td></td></tr><tr><td>LCD_DATA2</td><td>14</td><td>0x112C006C</td><td>0x1025</td><td></td></tr><tr><td>LCD_DATA3</td><td>15</td><td>0x112C0068</td><td>0x1025</td><td></td></tr><tr><td>LCD_DATA4</td><td>17</td><td>0x112C0058</td><td>0x1025</td><td></td></tr><tr><td>LCD_DATA5</td><td>18</td><td>0x112C005C</td><td>0x1025</td><td></td></tr><tr><td>LCD_DATA6</td><td>19</td><td>0x112C0060</td><td>0x1025</td><td></td></tr><tr><td>LCD_DATA7</td><td>21</td><td>0x112C0064</td><td>0x1025</td><td></td></tr></tbody></table><h2 id="_2、脚本" tabindex="-1">2、脚本 <a class="header-anchor" href="#_2、脚本" aria-label="Permalink to “2、脚本”">​</a></h2><p>config.sh</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>#!/bin/sh</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cd /komod</span></span>
<span class="line"><span>./load xm72010300 -i -sensor sc223a -osmem 32</span></span>
<span class="line"><span>sh /root/lcd_init.sh</span></span></code></pre></div><p>lcd_init.sh</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>#!/bin/sh</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#BL_PCTL</span></span>
<span class="line"><span>xmmm 0x100C0010 0x1000</span></span>
<span class="line"><span>#LCD_RESET</span></span>
<span class="line"><span>xmmm 0x112C0044 0x1A00</span></span>
<span class="line"><span>#LCD_CS</span></span>
<span class="line"><span>xmmm 0x112C0040 0x1007</span></span>
<span class="line"><span>#LCD_SCL</span></span>
<span class="line"><span>xmmm 0x112C003C 0x1807</span></span>
<span class="line"><span>#LCD_SDA</span></span>
<span class="line"><span>xmmm 0x112C0038 0x1807</span></span>
<span class="line"><span>#LCD_VS</span></span>
<span class="line"><span>xmmm 0x112C0050 0x1025</span></span>
<span class="line"><span>#LCD_HS</span></span>
<span class="line"><span>xmmm 0x112C004C 0x1025</span></span>
<span class="line"><span>#LCD_DE</span></span>
<span class="line"><span>xmmm 0x112C0054 0x1025</span></span>
<span class="line"><span>#LCD_CLK</span></span>
<span class="line"><span>xmmm 0x112C0048 0x1065</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#LCD_DATA2</span></span>
<span class="line"><span>xmmm 0x112C006C 0x1025</span></span>
<span class="line"><span>#LCD_DATA3</span></span>
<span class="line"><span>xmmm 0x112C0068 0x1025</span></span>
<span class="line"><span>#LCD_DATA4</span></span>
<span class="line"><span>xmmm 0x112C0058 0x1025</span></span>
<span class="line"><span>#LCD_DATA5</span></span>
<span class="line"><span>xmmm 0x112C005C 0x1025</span></span>
<span class="line"><span>#LCD_DATA6</span></span>
<span class="line"><span>xmmm 0x112C0060 0x1025</span></span>
<span class="line"><span>#LCD_DATA7</span></span>
<span class="line"><span>xmmm 0x112C0064 0x1025</span></span></code></pre></div>`,8)])])}const _=n(p,[["render",e]]);export{m as __pageData,_ as default};
