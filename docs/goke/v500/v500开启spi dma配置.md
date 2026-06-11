# SPI DMA 配置

### 1、内核打开如下宏定义

```
 CONFIG_DMADEVICES=y
 CONFIG_DMA_ENGINE=y
 CONFIG_EDMAC=y
```

### 2、对应芯片xm720xxxx.dtsi 修改

找到 CONFIG_EDMAC 宏，注释掉，暴露 edmac 节点

```
 edmac 和 spi_busX（X=0/1 根据实际使用哪一组进行选择） 上的#ifdef CONFIG_EDMAC  屏蔽
```

### 3、对应芯片xm720xxxx-demb.dts 修改

```
 spidev@X (X=0/1 根据实际使用哪一组进行选择)中，pl022,com-mode = <0> 改为 pl022,com-mode = <2>
```

### 4、内核source/kernel/linux-4.9.y/drivers/dma/edmac_xmedia.c 

函数 edmac_init_tsf_desc（）中

```
        config |= width << EDMAC_CONFIG_SRC_WIDTH_SHIFT;
        config |= width << EDMAC_CONFIG_DST_WIDTH_SHIFT;
        edmac_trace(2, "tsf_desc->ccfg = 0x%x\n", config);
```

```
       maxburst=0xf; 
        edmac_trace(3, "maxburst = 0x%x\n", maxburst);
```

注：maxburst调整容易造成数据丢失，需实测做调整，取值0x0-0xf

### 5、SPI 1.1 片选不生效（临时对策）

```
 source/kernel/linux-4.9.y/drivers/spi/spi-pl022.c   
 #define PL022_IDS_INDEX_XMEDIA    （4） 改为  #define PL022_IDS_INDEX_XMEDIA   （0）
```