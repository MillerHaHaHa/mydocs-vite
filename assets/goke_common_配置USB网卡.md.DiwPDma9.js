import{_ as a,o as n,c as e,a4 as t}from"./chunks/framework.DAe4SYBh.js";const g=JSON.parse('{"title":"配置 USB 网卡","description":"","frontmatter":{},"headers":[],"relativePath":"goke/common/配置USB网卡.md","filePath":"goke/common/配置USB网卡.md"}'),p={name:"goke/common/配置USB网卡.md"};function i(l,s,o,r,c,d){return n(),e("div",null,[...s[0]||(s[0]=[t(`<h1 id="配置-usb-网卡" tabindex="-1">配置 USB 网卡 <a class="header-anchor" href="#配置-usb-网卡" aria-label="Permalink to “配置 USB 网卡”">​</a></h1><p>1、GK7202V330RB_VA demo 板使用网卡型号 “ASIX AX88772B”，内核配置如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Device Drivers --&gt;</span></span>
<span class="line"><span>     Network device support --&gt;</span></span>
<span class="line"><span>          &lt;*&gt;USB Network Adapters ---&gt;</span></span>
<span class="line"><span>                      &lt;*&gt;Muti-purpose USB Networking Framework</span></span>
<span class="line"><span>                      &lt;*&gt;    ASIX AX88xxx Baseed USB 2.0 Ethernet Adapters</span></span>
<span class="line"><span>                      &lt;*&gt;    ASIX AX88179/1787A USB 3.0/2/0 to Gigabit Ehternet</span></span>
<span class="line"><span>                      -*-     CDC Ethernet support (Smart devices such as cable modems)</span></span>
<span class="line"><span>                      &lt;*&gt;    CDC NCM support</span></span>
<span class="line"><span>                      &lt;*&gt;    NetChip 1080 based cables (Laplink...)</span></span>
<span class="line"><span>                      &lt;*&gt; Simple USB Network Links (CDC Ethernet subset)</span></span>
<span class="line"><span>                      [*]         eTEK base host-to-host cables (Advance, Belkin...)</span></span>
<span class="line"><span>                      [*]          Embedder ARM Linux links (iPaq. ...)</span></span>
<span class="line"><span>                      &lt;*&gt;       Sharp Zaurus (stock R0Ms) and compatible</span></span></code></pre></div><p>2、GK7202V300RB_VA demo 板使用网卡型号 “ASIX AX88772B”，内核配置配置同第一点，还需要修改设备树，在</p><p>sdk/source/kernel/arch/arm/boot/dts/xm72020300.dtsi 中修改 usbdrd3_0 --&gt; dwc3 ---&gt; dr_mode = &quot;host&quot;</p>`,5)])])}const m=a(p,[["render",i]]);export{g as __pageData,m as default};
