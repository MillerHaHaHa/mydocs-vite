### Cross-compilation to ARM, no tests are run

```sh
export CC=/opt/arm-buildroot-linux-uclibcgnueabihf-4.9.4-uclibc-1.0.31/bin/arm-buildroot-linux-uclibcgnueabihf-gcc CXX=/opt/arm-buildroot-linux-uclibcgnueabihf-4.9.4-uclibc-1.0.31/bin/arm-buildroot-linux-uclibcgnueabihf-g++
```

```sh
mkdir build && cd build
```

官方文档参考

```sh
cmake .. -DBUILD_OPENSSL=TRUE -DBUILD_OPENSSL_PLATFORM=linux-generic32 -DBUILD_LIBSRTP_HOST_PLATFORM=x86_64-unknown-linux-gnu -DBUILD_LIBSRTP_DESTINATION_PLATFORM=arm-unknown-linux-uclibcgnueabi
```

```
make
```

openssl  库可以自己下在下来交叉编译，再放到 open-source 指定的路径

```
./configure linux-generic32 no-asm shared no-async --prefix=/home/miller/lib/arm/openssl
make
```

mbedtls 库

改 CMakeList 之后 cmake ..

```
cmake .. -DBUILD_LIBSRTP_HOST_PLATFORM=x86_64-unknown-linux-gnu -DBUILD_LIBSRTP_DESTINATION_PLATFORM=arm-unknown-linux-uclibcgnueabi
```

### Linux

```
cmake .. -DBUILD_TEST=TRUE -DUSE_OPENSSL=OFF -DUSE_MBEDTLS=ON
```

### 下载

```
git clone --recursive https://github.com.cnpmjs.org/awslabs/amazon-kinesis-video-streams-webrtc-sdk-c.git
```

git clone https://github.com.cnpmjs.org/macchina-io/macchina.io.git
