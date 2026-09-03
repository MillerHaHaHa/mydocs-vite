# 配置 USB 网卡

1、GK7202V330RB_VA demo 板使用网卡型号 “ASIX AX88772B”，内核配置如下：
```
Device Drivers -->
     Network device support -->
          <*>USB Network Adapters --->
                      <*>Muti-purpose USB Networking Framework
                      <*>    ASIX AX88xxx Baseed USB 2.0 Ethernet Adapters
                      <*>    ASIX AX88179/1787A USB 3.0/2/0 to Gigabit Ehternet
                      -*-     CDC Ethernet support (Smart devices such as cable modems)
                      <*>    CDC NCM support
                      <*>    NetChip 1080 based cables (Laplink...)
                      <*> Simple USB Network Links (CDC Ethernet subset)
                      [*]         eTEK base host-to-host cables (Advance, Belkin...)
                      [*]          Embedder ARM Linux links (iPaq. ...)
                      <*>       Sharp Zaurus (stock R0Ms) and compatible
```

2、GK7202V300RB_VA demo 板使用网卡型号 “ASIX AX88772B”，内核配置配置同第一点，还需要修改设备树，在

sdk/source/kernel/arch/arm/boot/dts/xm72020300.dtsi 中修改 usbdrd3_0  --> dwc3 ---> dr_mode = "host"
