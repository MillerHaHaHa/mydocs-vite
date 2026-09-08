import{_ as a,o as n,c as i,a4 as e}from"./chunks/framework.DAe4SYBh.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"technology/linux_server/安装samba服务.md","filePath":"technology/linux_server/安装samba服务.md"}'),p={name:"technology/linux_server/安装samba服务.md"};function l(t,s,r,c,o,d){return n(),i("div",null,[...s[0]||(s[0]=[e(`<ol><li><p>安装</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>sudo apt-get install samba</span></span>
<span class="line"><span>sudo apt-get install samba-common-bin    #raspberry</span></span>
<span class="line"><span>sudo apt-get install samba samba-common  #ubuntu</span></span></code></pre></div></li><li><p>编辑配置文件</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>sudo nano /etc/samba/smb.conf</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>#================Share Definitions</span></span>
<span class="line"><span>read only = no //before is yes</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>#==================Add =====================</span></span>
<span class="line"><span>[MyShare]</span></span>
<span class="line"><span>#share folder instructions</span></span>
<span class="line"><span>comment = My Public Storage</span></span>
<span class="line"><span>#share folder directory         </span></span>
<span class="line"><span>path = /home/pi</span></span>
<span class="line"><span>#share to other resources name</span></span>
<span class="line"><span>browseable = yes</span></span>
<span class="line"><span>#writable</span></span>
<span class="line"><span>writable = yes</span></span>
<span class="line"><span>#new file permissions 777</span></span>
<span class="line"><span>create mask = 0777</span></span>
<span class="line"><span>#new folder permissions 777</span></span>
<span class="line"><span>directory mask = 0777</span></span>
<span class="line"><span>#guest ask, no password</span></span>
<span class="line"><span>guest ok = yes</span></span>
<span class="line"><span>#users, ubuntu</span></span>
<span class="line"><span>valid users = miller</span></span></code></pre></div><div class="language-ubuntu"><button title="Copy Code" class="copy"></button><span class="lang">ubuntu</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>[share]</span></span>
<span class="line"><span>comment = share folder</span></span>
<span class="line"><span>browseable = yes</span></span>
<span class="line"><span>path = /home/miller</span></span>
<span class="line"><span>create mask = 0777</span></span>
<span class="line"><span>directory mask = 0777</span></span>
<span class="line"><span>valid users = miller</span></span>
<span class="line"><span>force user = miller</span></span>
<span class="line"><span>force group = miller</span></span>
<span class="line"><span>public = yes</span></span>
<span class="line"><span>available = yes</span></span>
<span class="line"><span>writable = yes</span></span></code></pre></div></li><li><p>添加用户</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>sudo smbpasswd -a pi     #raspberry</span></span>
<span class="line"><span>sudo smbpasswd -a miller #ubuntu</span></span></code></pre></div><blockquote><p>password 111</p></blockquote></li><li><p>启动服务</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>#respberry</span></span>
<span class="line"><span>sudo /etc/init.d/smbd restart</span></span>
<span class="line"><span>sudo /etc/init.d/nmbd restart</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#ubuntu</span></span>
<span class="line"><span>sudo service smbd restart</span></span></code></pre></div></li><li><p>配置权限</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>sudo chmod -R 777 /home/pi      #raspberry</span></span>
<span class="line"><span>sudo chmod -R 777 /home/miller  #ubuntu</span></span></code></pre></div></li><li><p>配置 PC 端</p><p>运行组策略编辑器，命令行输入</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>gpedit.msc</span></span></code></pre></div><p>计算机配置-管理模板-网络-Lanman 工作站-启用不安全的来宾登录</p><p>双击，点击已启用，确定</p></li><li><p>最后运行，命令行输入，IP 为树莓派 IP 地址</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>\\\\IP\\\\MyShare</span></span>
<span class="line"><span>\\\\192.168.0.109\\MyShare</span></span></code></pre></div></li></ol>`,1)])])}const b=a(p,[["render",l]]);export{g as __pageData,b as default};
