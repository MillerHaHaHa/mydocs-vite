输出测试视频到 fb

```
sudo ffmpeg -f lavfi -t 30 -i testsrc=rate=60:size=480x320 -pix_fmt rgb565le -c:v rawvideo -an -f fbdev /dev/fb1
```

解码视频到 fb

```
ffmpeg -i output_480x320.mp4 -c:v rawvideo -f fbdev -pix_fmt rgb565le -video_size 480x320 -framerate 60 /dev/fb1
```

树莓派测试屏幕

```sh
service lightdm stop
cat /dev/urandom > /dev/fb1
```
