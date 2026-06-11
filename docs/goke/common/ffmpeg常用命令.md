# FFMPEG 常用命令

## 播放类

#### 播放 yuv

```
ffplay.exe -f rawvideo -pixel_format yuv420p -video_size 1280x720 -framerate 25 .\out.yuv
```

#### 播放 mjpeg

```
ffplay.ext -f mjpeg out.mjpeg
```

#### 播放 h265/h264

```
ffplay -f h265 out.h265
```

#### 播放 rtsp

```
ffplay -fflags nobuffer -flags low_delay -framedrop -rtsp_transport tcp -analyzeduration 100 -probesize 32 -i rtsp://192.168.145.122:554/livestream/0
```

```
ffplay -vcodec h264_qsv -fflags nobuffer -flags low_delay -framedrop -rtsp_transport tcp -analyzeduration 100 -probesize 32 -an -nostats -x 1920 -y 1080 -top 30 -i "rtsp://192.168.145.122:554/livestream/0"
```

```
ffplay -vcodec hevc_qsv -fflags nobuffer -flags low_delay -framedrop -rtsp_transport tcp -analyzeduration 100 -probesize 32 -an -nostats -x 1920 -y 1080 -top 30 -i "rtsp://192.168.145.122:554/livestream/0"
```

```
ffplay -vcodec hevc_qsv -fflags nobuffer -flags low_delay -framedrop -rtsp_transport tcp -analyzeduration 100 -probesize 32 -an -nostats -x 1920 -y 1080 -top 30 -i "rtsp://192.168.0.1:554/livestream/0"
```

```
ffplay -vcodec hevc_cuvid -fflags nobuffer -flags low_delay -framedrop -rtsp_transport tcp -analyzeduration 0 -probesize 32768 -an -nostats -i rtsp://192.168.0.117:8554/h265live
```

#### 输出 video 节点到 framebuffer

```
ffmpeg -i /dev/video0 -pix_fmt bgra -f fbdev /dev/fb0
```



## 转格式类

#### MJPEG 裁剪时长

```
ffmpeg -i input.mjpeg -ss 00:00:00 -t 10 -c:v copy output.mjpeg
```

#### 转 MJPEG，禁用音频

```
ffmpeg -i input.mp4 -c:v mjpeg -q:v 1 -an -r 30 output.mjpeg
```

`-r 帧率`

```
ffmpeg -i input.mp4 -c:v mjpeg -q:v 1 -an -framerate 30 output.mjpeg
```

#### 播放 pcm

```
ffplay -f s16le -ar 16000 -ac 1 audio.pcm
```

#### 播放 g711a

```
ffplay -f alaw -ar 16000 -ac 1 audio.g711a
```

#### 音频音量调大

```
ffmpeg -i input.mp3 -af "volume=2.0" output.mp3
```

#### wav 转 MP3

```
ffmpeg -i input.wav -ar 16000 output.mp3
```

#### MJPEG 改分辨率

```
ffmpeg -i input.mjpeg -vf "scale=1920:1080" output.mjpeg
```

#### 生成时间戳

```
ffmpeg -i input.mjpeg -vf "setpts=PTS-STARTPTS" output.mjpeg
```

#### MJPEG 改码率

```
ffmpeg -i input.mjpeg -b:v target_bitrate output.mjpeg
```

#### MJPEG yuv 编码 MJPEG

```
ffmpeg -f rawvideo -pixel_format yuv420p -video_size 1080x720 -i out.yuv -c:v mjpeg test_1080x720.mjpeg
```

#### 生成测试视频

```
ffmpeg -f lavfi -i testsrc=size=1280x720:rate=30 -vf "setpts=N/(FRAME_RATE*TB)" -r 30 -t 30 -c:v mjpeg output.mjpeg
```

```
ffmpeg -f lavfi -i testsrc=size=720x480 -vf "setpts=PTS-STARTPTS" -bf 0 -r 30 -g 60 -t 10 -c:v h264 output.hevc
```

```
ffmpeg -f lavfi -i testsrc=size=1280x720 -bf 0 -r 30 -t 30 -c:v libx264 output.h264
```

```
ffmpeg -f lavfi -i testsrc=size=720x480 -vf "setpts=PTS-STARTPTS" -bf 0 -r 30 -g 60 -t 10 -c:v hevc out.hevc
```

#### MJPEG 解码成 yuv420

```
ffmpeg -c:v mjpeg -i input.jpg -pix_fmt yuvj420p out.yuv
```

#### 生成测试 yuv

```
 ffmpeg.exe -f lavfi -i testsrc=duration=1:size=320x240:rate=1 image_320x240.yuv
```



## 检测类

#### 检查视频帧数

```
ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of default=noprint_wrappers=1 input.mp4
```

#### 检查视频帧率和时长

```
ffprobe -v error -select_streams v:0 -show_entries stream=duration,r_frame_rate -of csv=p=0 input.mp4
```
