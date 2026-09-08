import{_ as n,o as a,c as p,a4 as e}from"./chunks/framework.DAe4SYBh.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"goke/common/flash块大小调整.md","filePath":"goke/common/flash块大小调整.md"}'),i={name:"goke/common/flash块大小调整.md"};function l(_,s,t,c,r,o){return a(),p("div",null,[...s[0]||(s[0]=[e(`<p>flash 块大小从 64K 修改为 32K</p><p>patch：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>diff --git a/u-boot-2020.01/drivers/mtd/spi/fmc100/fmc_spi_nor_ids.c b/u-boot-2020.01/drivers/mtd/spi/fmc100/fmc_spi_nor_ids.c</span></span>
<span class="line"><span>index 6ce44a12..1af349e7 100644</span></span>
<span class="line"><span>--- a/u-boot-2020.01/drivers/mtd/spi/fmc100/fmc_spi_nor_ids.c</span></span>
<span class="line"><span>+++ b/u-boot-2020.01/drivers/mtd/spi/fmc100/fmc_spi_nor_ids.c</span></span>
<span class="line"><span>@@ -167,6 +167,7 @@ set_erase_sector_64k(0, _64K, 112);</span></span>
<span class="line"><span> set_erase_sector_64k(0, _64K, 120);</span></span>
<span class="line"><span> set_erase_sector_64k(0, _64K, 133);</span></span>
<span class="line"><span> set_erase_sector_64k4b(0, _64K, 133);</span></span>
<span class="line"><span>+set_erase_sector_32k(0, _32K, 100);</span></span>
<span class="line"><span></span></span>
<span class="line"><span> #include &quot;fmc100_spi_general.c&quot;</span></span>
<span class="line"><span> static struct spi_drv spi_driver_general = {</span></span>
<span class="line"><span>@@ -1697,7 +1698,7 @@ static struct spi_nor_info fmc_spi_nor_info_table[] = {</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>-               &quot;GD25Q32&quot;, {0xC8, 0x40, 0x16}, 3, _4M,  _64K, 3,</span></span>
<span class="line"><span>+               &quot;GD25Q32&quot;, {0xC8, 0x40, 0x16}, 3, _4M,  _32K, 3,</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                        &amp;read_std(0, INFINITE, 66),  /* 66MHz */</span></span>
<span class="line"><span>                        &amp;read_quad(1, INFINITE, 80), /* 80MHz */</span></span>
<span class="line"><span>@@ -1709,7 +1710,7 @@ static struct spi_nor_info fmc_spi_nor_info_table[] = {</span></span>
<span class="line"><span>                        0</span></span>
<span class="line"><span>                },</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>-                       &amp;erase_sector_64k(0, _64K, 100),  /* 100MHz */</span></span>
<span class="line"><span>+                       &amp;erase_sector_32k(0, _32K, 100),  /* 100MHz */</span></span>
<span class="line"><span>                        0</span></span>
<span class="line"><span>                },</span></span>
<span class="line"><span>                &amp;spi_driver_gd25qxxx,</span></span></code></pre></div>`,3)])])}const f=n(i,[["render",l]]);export{m as __pageData,f as default};
