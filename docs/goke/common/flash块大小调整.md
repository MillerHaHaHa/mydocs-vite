flash 块大小从 64K 修改为 32K

patch：

```
diff --git a/u-boot-2020.01/drivers/mtd/spi/fmc100/fmc_spi_nor_ids.c b/u-boot-2020.01/drivers/mtd/spi/fmc100/fmc_spi_nor_ids.c
index 6ce44a12..1af349e7 100644
--- a/u-boot-2020.01/drivers/mtd/spi/fmc100/fmc_spi_nor_ids.c
+++ b/u-boot-2020.01/drivers/mtd/spi/fmc100/fmc_spi_nor_ids.c
@@ -167,6 +167,7 @@ set_erase_sector_64k(0, _64K, 112);
 set_erase_sector_64k(0, _64K, 120);
 set_erase_sector_64k(0, _64K, 133);
 set_erase_sector_64k4b(0, _64K, 133);
+set_erase_sector_32k(0, _32K, 100);

 #include "fmc100_spi_general.c"
 static struct spi_drv spi_driver_general = {
@@ -1697,7 +1698,7 @@ static struct spi_nor_info fmc_spi_nor_info_table[] = {
        },

        {
-               "GD25Q32", {0xC8, 0x40, 0x16}, 3, _4M,  _64K, 3,
+               "GD25Q32", {0xC8, 0x40, 0x16}, 3, _4M,  _32K, 3,
                {
                        &read_std(0, INFINITE, 66),  /* 66MHz */
                        &read_quad(1, INFINITE, 80), /* 80MHz */
@@ -1709,7 +1710,7 @@ static struct spi_nor_info fmc_spi_nor_info_table[] = {
                        0
                },
                {
-                       &erase_sector_64k(0, _64K, 100),  /* 100MHz */
+                       &erase_sector_32k(0, _32K, 100),  /* 100MHz */
                        0
                },
                &spi_driver_gd25qxxx,
```