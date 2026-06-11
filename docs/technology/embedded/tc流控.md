# tc 流控

> https://blog.csdn.net/weixin_43865008/article/details/119887605

<br/>

```
tc qdisc show
```

延时

```
tc qdisc add dev enp3s0 root netem delay 30ms
```

```
tc qdisc change dev wlp5s0 root netem delay 30ms
```

```
tc qdisc del dev enp3s0 root netem delay 30ms
```

丢包

```
tc qdisc add dev wlp5s0 root netem loss 10%
tc qdisc add dev enp3s0 root netem loss 10%
```

```
tc qdisc change dev enp3s0 root netem loss 20%
```

```
tc qdisc del dev wlp5s0 root netem loss 20%
```

带宽

```
tc qdisc add dev enp3s0 root netem rate 10Gbps
```

```
tc qdisc add dev enp3s0 root netem rate 300Mbps
tc qdisc add dev enp3s0 root netem rate 300Mbit
```

模拟延迟波动（在这个范围波动）

```
tc qdisc add dev wlp5s0 root netem delay 100ms 10ms
```

模拟包重复（随机产生 1% 的重复数据包）

```
tc qdisc add dev wlp5s0 root netem duplicate 1%
```

模拟包损坏（随机产生 0.2% 的坏包）

```
tc qdisc add dev wlp5s0 root netem corrupt 0.2%
```

模拟包乱序（有 25% 的数据包（ 50% 相关）会被立即发送，其他的延迟 10ms）

```
tc qdisc add dev wlp5s0 root netem delay 10ms reorder 25% 50%
```

联合使用

```
tc qdisc add dev wlp5s0 root netem delay 15ms loss 1% rate 1000Mbps
```
