import{_ as a,o as n,c as p,a4 as t}from"./chunks/framework.DAe4SYBh.js";const _=JSON.parse('{"title":"ssh 多次登录失败加入黑名单","description":"","frontmatter":{},"headers":[],"relativePath":"technology/linux_server/ssh多次登录失败加入黑名单.md","filePath":"technology/linux_server/ssh多次登录失败加入黑名单.md"}'),e={name:"technology/linux_server/ssh多次登录失败加入黑名单.md"};function l(i,s,o,c,h,r){return n(),p("div",null,[...s[0]||(s[0]=[t(`<h1 id="ssh-多次登录失败加入黑名单" tabindex="-1">ssh 多次登录失败加入黑名单 <a class="header-anchor" href="#ssh-多次登录失败加入黑名单" aria-label="Permalink to “ssh 多次登录失败加入黑名单”">​</a></h1><h3 id="_1-脚本" tabindex="-1">1. 脚本 <a class="header-anchor" href="#_1-脚本" aria-label="Permalink to “1. 脚本”">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>#!/usr/bin/bash</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 通过lastb获取登录失败的IP及登录失败的次数</span></span>
<span class="line"><span>lastb | awk &#39;{print $3}&#39; | grep ^[0-9] | sort | uniq -c | awk &#39;{print $1&quot;\\t&quot;$2}&#39; &gt; /tmp/host_list</span></span>
<span class="line"><span>list=\`cat /tmp/host_list\`</span></span>
<span class="line"><span>line=\`wc -l /tmp/host_list | awk &#39;{print $1}&#39;\`</span></span>
<span class="line"><span>count=1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 如果/tmp/host_list中有数据，循环至少需要执行一次</span></span>
<span class="line"><span>while [[ &quot;$line&quot; -ge &quot;$count&quot; ]]; do</span></span>
<span class="line"><span>        ip_add=\`echo $list | awk &#39;{FS=&quot;\\t&quot;} {print $2}&#39;\`</span></span>
<span class="line"><span>        num=\`echo $list | awk  &#39;{FS=&quot;\\t&quot;} {print $1}&#39;\`</span></span>
<span class="line"><span>        #   登录失败达到5次就将该IP写入文件</span></span>
<span class="line"><span>        if [[ &quot;$num&quot; -ge 5 ]]; then</span></span>
<span class="line"><span>                grep &quot;$ip_add&quot; /etc/hosts.deny &amp;&gt; /dev/null</span></span>
<span class="line"><span>                if [[ &quot;$?&quot; -gt 0 ]]; then</span></span>
<span class="line"><span>                        # --------&gt; 此处添加当前系统时间，请根据实际情况定义日期格式</span></span>
<span class="line"><span>                        echo &quot;# $(date +%F&#39; &#39;%H:%M:%S)&quot; &gt;&gt; /etc/hosts.deny</span></span>
<span class="line"><span>                        echo &quot;sshd:$ip_add&quot; &gt;&gt; /etc/hosts.deny</span></span>
<span class="line"><span>                fi</span></span>
<span class="line"><span>        fi</span></span>
<span class="line"><span>        let count+=1</span></span>
<span class="line"><span>        #   删除已经写入文件的IP</span></span>
<span class="line"><span>        sed -i &#39;1d&#39; /tmp/host_list</span></span>
<span class="line"><span>        #   修改$list变量</span></span>
<span class="line"><span>        list=\`cat /tmp/host_list\`</span></span>
<span class="line"><span>done</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 清空临时文件</span></span>
<span class="line"><span>echo &#39;&#39; &gt; /tmp/host_list</span></span>
<span class="line"><span>exit 0</span></span></code></pre></div><h3 id="_2-加入-crontab-定时任务" tabindex="-1">2. 加入 crontab 定时任务 <a class="header-anchor" href="#_2-加入-crontab-定时任务" aria-label="Permalink to “2. 加入 crontab 定时任务”">​</a></h3><p>crontab -e</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>* */1 * * * sudo bash /usr/local/script/ssh_deny.sh</span></span></code></pre></div><h3 id="_3-参考" tabindex="-1">3. 参考 <a class="header-anchor" href="#_3-参考" aria-label="Permalink to “3. 参考”">​</a></h3><blockquote><p><a href="https://blog.csdn.net/weixin_52270081/article/details/121496140" target="_blank" rel="noreferrer">https://blog.csdn.net/weixin_52270081/article/details/121496140</a></p></blockquote>`,8)])])}const u=a(e,[["render",l]]);export{_ as __pageData,u as default};
