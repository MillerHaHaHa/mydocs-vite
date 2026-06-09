# UART1 的使用

以 GK7202V300 为例

## 1. 设备树配置

修改 `sdk/source/kernel/linux-4.9.y/arch/arm/boot/dts/xm72020300-demb.dts`，使能 uart1 节点

```
&uart1 {
	status = "okay";
};
```

修改后保存，重新编译并烧录内核



## 2. 配置 pinmux

根据实际硬件原理图，将管脚 pinmux 复用成 UART1 功能



## 3. 验证

cat uart1 节点： `cat /dev/ttyAMA1`，如果阻塞住，则配置成功。

如果出现以下打印，则不成功，请检查上面的步骤。

```sh
cat /dev/ttyAMA1
cat: can't open '/dev/ttyAMA1': No such device or address
```



确认节点正常后，使用 stty 工具查看 uart 信息

```sh
stty -F /dev/ttyAMA1 -a
speed 9600 baud;stty: /dev/ttyAMA1
 line = 0;
intr = ^C; quit = ^\; erase = ^?; kill = ^U; eof = ^D; eol= <undef>;
eol2 = <undef>; swtch = <undef>; start = ^Q; stop = ^S; susp = ^Z; rprnt = ^R;
werase = ^W; lnext = ^V; flush = ^O; min = 1; time = 0;
-parenb -parodd cs8 hupcl -cstopb cread clocal -crtscts
-ignbrk -brkint -ignpar -parmrk -inpck -istrip -inlcr -igncr icrnl ixon -ixoff
-iuclc -ixany -imaxbel -iutf8
opost -olcuc -ocrnl onlcr -onocr -onlret -ofill -ofdel nl0 cr0 tab0 bs0 vt0 ff0
isig icanon iexten echo echoe echok -echonl -noflsh -xcase -tostop -echoprt
echoctl echoke
```



## 4. 问题排查

### 4.1 检查驱动是否成功配置

```sh
cat /proc/tty/driver/ttyAMA
serinfo:1.0 driver revision:
0: uart:PL011 rev2 mmio:0x12040000 irq:20 tx:3080 rx:253
RTS|CTS|DTR|DSR|CD|RI
1: uart:PL011 rev2 mmio:0x12041000 irq:21 tx:0 rx:0 DSR|CD|RI
```



### 4.2 检查设备树是否配置成功

将板端的 `/sys/firmware/fdt` 拷贝到 PC

PC 使用 `dtc fdt` 命令查看设备树

查看 uart1 节点是否 okay

```
uart@1204000 {
	compatible = "arm,pl011", "arm,primecell";
	reg = <0x12040000 0x1000>;
	interrupts = <0x0 0x7 0x4>;
	clocks = <0x4 0x28>;
	clock-names = "apb_pclk";
	status = "okay";
};
```

