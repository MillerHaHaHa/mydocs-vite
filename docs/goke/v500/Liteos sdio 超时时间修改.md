1   drivers/mmc/host/sdhci/sdhci.c   sdhci_task  这个里面会50ms去判断一下状态 
    这个里面的50ms 可以给长一点，比如 300ms 
	-------------- 这个可能会影响到插拔 sdcard 的识别速度
	

2  减小超时时间
  （1） drivers/mmc/core/mmc.c 
        mmc_send_app_op_cond 里面有个 for 循环 1000 * 10 ms
        客户可酌情减小
        -------- 影响 sdcard 识别
		
  （2） drivers/mmc/core/mmc.c	
        mmc_send_op_cond  里面的for 循环 1000  * 10 ms
        客户可酌情减小
        -------- 影响 mmc 器件识别
		
  （3） drivers/mmc/core/sdio_ops.c 
        sdio_io_send_op_cond 里面的for 循环 1000 *  10 ms 延时
		客户可酌情减小
        ------ 影响sdio设备识别

  （4） drivers/mmc/core/mmc.c
        默认的cmd超时时间是 100ms，data的超时时间是10ms，修改如下宏，可以改超时时间  
        #define MMC_DATA_WAIT_TIMEOUT   (10 * LOSCFG_BASE_CORE_TICK_PER_SECOND)   
        #define MMC_CMD_WAIT_TIMEOUT    (LOSCFG_BASE_CORE_TICK_PER_SECOND)       

		LOSCFG_BASE_CORE_TICK_PER_SECOND 属于系统参数，不能修改；
	    可以适当减小 MMC_DATA_WAIT_TIMEOUT 	MMC_CMD_WAIT_TIMEOUT。

  （5） 每次命令或者数据发送的循环次数 
        #define CMD_RETRIES  3
		这个酌情修改. 在 drivers/mmc 下搜一下定义的地方

  

3  drivers/mmc/core/mmc.c  mmc_go_discovery
   device_printf ---》dev_logd 或者直接注释掉那几个报错
   ---------------- 去掉识别的打印。建议客户调测满足要求后，最后再做这一步。