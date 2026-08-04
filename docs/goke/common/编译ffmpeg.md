编译 examples

```bash
PKG_CONFIG_PATH=/data/huangmingle/project/linux_master/sayram/open_source/ffmpeg/_install/lib/pkgconfig make CC=arm-gcc7.3-linux-musleabi-gcc
```

```bash
PKG_CONFIG_PATH=/data/huangmingle/project/linux_master/sayram/open_source/ffmpeg/_install/lib/pkgconfig make CC=arm-gcc6.3-linux-uclibceabi-gcc
```

```
arm-gcc6.3-linux-uclibceabi-gcc -I/data/huangmingle/project/linux_master/sayram/open_source/ffmpeg/_install/include -Wall -g   -c -o decode_video.o decode_video.c
arm-gcc6.3-linux-uclibceabi-gcc   decode_video.o  -L/data/huangmingle/project/linux_master/sayram/open_source/ffmpeg/_install/lib -lavformat -lm -latomic -lavcodec -pthread -lm -latomic -lswscale -lm -latomic -lavutil -pthread -lm -latomic  -o decode_video
```



examples Makefile

```makefile
# use pkg-config for getting CFLAGS and LDLIBS
# FFMPEG_LIBS=    \
#                 libavdevice                        \
#                 libavformat                        \
#                 libavfilter                        \
#                 libavcodec                         \
#                 libswresample                      \
#                 libswscale                         \
#                 libavutil                          \

FFMPEG_LIBS=    libavcodec                         \
                libswscale                         \
                libavutil                          \

CFLAGS += -Wall -g
CFLAGS := $(shell pkg-config --cflags $(FFMPEG_LIBS)) $(CFLAGS)
# LDLIBS := $(shell pkg-config --libs $(FFMPEG_LIBS)) $(LDLIBS)
LDLIBS := -L/data/huangmingle/project/linux_master/sayram/open_source/ffmpeg/_install/lib -lavcodec -pthread -lswscale -lavutil

EXAMPLES=         decode_video                       

# EXAMPLES=       avio_list_dir                      \
#                 avio_reading                       \
#                 decode_audio                       \
#                 decode_video                       \
#                 demuxing_decoding                  \
#                 encode_audio                       \
#                 encode_video                       \
#                 extract_mvs                        \
#                 filtering_video                    \
#                 filtering_audio                    \
#                 http_multiclient                   \
#                 hw_decode                          \
#                 metadata                           \
#                 muxing                             \
#                 remuxing                           \
#                 resampling_audio                   \
#                 scaling_video                      \
#                 transcode_aac                      \
#                 transcoding                        \

OBJS=$(addsuffix .o,$(EXAMPLES))

# the following examples make explicit use of the math library
avcodec:           LDLIBS += -lm
encode_audio:      LDLIBS += -lm
muxing:            LDLIBS += -lm
resampling_audio:  LDLIBS += -lm

.phony: all clean-test clean

$(warning "OBJS = $(OBJS)")
$(warning "EXAMPLES = $(EXAMPLES)")
$(warning "CFLAGS = $(CFLAGS)")
$(warning "LDLIBS = $(LDLIBS)")

all: $(OBJS) $(EXAMPLES)

clean-test:
	$(RM) test*.pgm test.h264 test.mp2 test.sw test.mpg

clean: clean-test
	$(RM) $(EXAMPLES) $(OBJS)

```

configure 命令

```shell
#!/usr/bin/sh

# sh configure.sh ffmpeg arm-gcc7.3-linux-musleabi

CURRENT_DIR=$PWD

cd $1

if [ $2 = "arm-gcc12.2.0-linux" ] || [ $2 = "arm-gcc12.2.0-linux-uclibceabi" ]; then
./configure --prefix=$3 --enable-cross-compile --target-os=linux --cpu=$4 --arch=armv7-a --cross-prefix=$2- \
--enable-small --disable-runtime-cpudetect --disable-autodetect --disable-all --disable-everything \
--enable-avcodec --enable-avutil --enable-avformat --enable-swscale \
--enable-decoder=mjpeg --enable-parser=mjpeg --enable-demuxer=mjpeg \
--enable-decoder=h264 --enable-parser=h264 --enable-demuxer=h264 \
--enable-decoder=hevc --enable-parser=hevc --enable-demuxer=hevc \
--enable-decoder=aac --enable-parser=aac --enable-parser=ac3 --enable-demuxer=aac \
--enable-bsf=h264_mp4toannexb --enable-bsf=hevc_mp4toannexb --enable-demuxer=mov \
--enable-demuxer=mpegts --enable-demuxer=mpegtsraw \
--disable-protocols --enable-protocol=file \
--disable-doc --disable-debug --disable-iconv \
--disable-armv5te --disable-armv6 --disable-armv6t2 --enable-static \
--enable-neon --enable-asm \
--extra-cflags=-fno-short-enums \
--extra-cflags=-mfloat-abi=hard \
--extra-cflags=-mfpu=neon \
--extra-cflags=-ffunction-sections \
--extra-cflags=-fdata-sections
else
./configure --prefix=$3 --enable-cross-compile --target-os=linux --cpu=cortex-a7 --arch=arm --cross-prefix=$2- \
 --enable-small --disable-runtime-cpudetect --disable-autodetect --disable-all --enable-avcodec --enable-avutil --enable-avformat \
 --enable-swscale --disable-everything \
 --enable-decoder=mjpeg --enable-parser=mjpeg \
 --enable-decoder=h264 --enable-parser=h264 \
 --enable-decoder=hevc --enable-parser=hevc \
 --disable-doc --disable-debug --disable-iconv \
 --disable-armv5te --disable-armv6 --disable-armv6t2 --enable-static \
 --enable-neon --enable-asm \
 --extra-cflags=-fno-short-enums \
 --extra-cflags=-mfloat-abi=softfp \
 --extra-cflags=-mfpu=neon \
 --extra-cflags=-ffunction-sections \
 --extra-cflags=-fdata-sections
```