import{_ as n,o as a,c as e,a4 as p}from"./chunks/framework.DAe4SYBh.js";const u=JSON.parse('{"title":"ubuntu20.04 net-tools","description":"","frontmatter":{},"headers":[],"relativePath":"technology/linux_server/双网卡配置samba.md","filePath":"technology/linux_server/双网卡配置samba.md"}'),t={name:"technology/linux_server/双网卡配置samba.md"};function i(l,s,o,c,r,d){return a(),e("div",null,[...s[0]||(s[0]=[p(`<h1 id="ubuntu20-04-net-tools" tabindex="-1">ubuntu20.04 net-tools <a class="header-anchor" href="#ubuntu20-04-net-tools" aria-label="Permalink to “ubuntu20.04 net-tools”">​</a></h1><p>vb 虚拟机中添加 host-only 网卡</p><p>启动网卡 <code>sudo ifconfig enp0s8 up</code></p><p>配置静态地址 <code>sudo nano /etc/netplan/00-installer-config.yaml</code></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># This is the network config written by &#39;subiquity&#39;</span></span>
<span class="line"><span>network:</span></span>
<span class="line"><span>  ethernets:</span></span>
<span class="line"><span>    enp0s3:</span></span>
<span class="line"><span>      dhcp4: true</span></span>
<span class="line"><span>    enp0s8:</span></span>
<span class="line"><span>      dhcp4: false</span></span>
<span class="line"><span>      addresses: [192.168.56.106/24]</span></span>
<span class="line"><span>  version: 2</span></span></code></pre></div><p>应用网络配置 <code>sudo netplan apply</code></p><h1 id="debian-network-interfaces" tabindex="-1">Debian network-interfaces <a class="header-anchor" href="#debian-network-interfaces" aria-label="Permalink to “Debian network-interfaces”">​</a></h1><p>修改网卡配置文件 <code>nano /etc/network/interfaces</code></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>auto enp0s3</span></span>
<span class="line"><span>allow-hotplug enp0s3</span></span>
<span class="line"><span>iface enp0s3 inet dhcp</span></span>
<span class="line"><span></span></span>
<span class="line"><span>auto enp0s8</span></span>
<span class="line"><span>allow-hotplug enp0s8</span></span>
<span class="line"><span>iface enp0s8 inet static</span></span>
<span class="line"><span>address 192.168.56.106</span></span></code></pre></div><p>重启网卡服务 <code>systemctl restart networking.service</code></p>`,10)])])}const b=n(t,[["render",i]]);export{u as __pageData,b as default};
