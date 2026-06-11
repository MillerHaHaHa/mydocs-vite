mosquitto 依赖 openssl，uuid，cJSON 库，都要编译 arm 动态库

## openssl 1.1.1

```
./Configure linux-generic32 no-asm shared no-async --prefix=/home/miller/lib/ingenic/openssl

vi Makefile
#找 -m64，删除，一般 2 个地方

#SSD2XX
export cross=arm-linux-gnueabihf- 
#SSD3XX
export cross=arm-linux-gnueabihf-gcc4.9.4-uclibc1.0.31- 

make CC="${cross}gcc" AR="${cross}ar" RANLIB="${cross}ranlib"

make install
```

## uuid

SSD2XX

```
./configure --prefix=/home/miller/lib/arm/libuuid-1.0.3 CC=arm-linux-gnueabihf-gcc --host=arm-linux
```

SSD3XX

```
./configure --prefix=/home/miller/lib/arm/libuuid-1.0.3 CC=arm-linux-gnueabihf-gcc4.9.4-uclibc1.0.31-gcc --host=arm-linux
make -j8
make install
```

## cJSON

SSD2XX

```
export CC=arm-linux-gnueabihf-gcc
```

SSD3XX

```
export CC=arm-linux-gnueabihf-gcc4.9.4-uclibc1.0.31-gcc
cmake -DCMAKE_TOOLCHAIN_FILE=~/project/self_sdk/arm_linux_setup.cmake .. -DENABLE_CJSON_UTILS=On -DENABLE_CJSON_TEST=Off 
make
make DESTDIR=~/lib/arm/cJSON install
改下文件路径
```

## mosquitto

```
#SSD2XX
export cross=arm-linux-gnueabihf- 
#SSD3XX
export cross=arm-linux-gnueabihf-gcc4.9.4-uclibc1.0.31- 
```

```
make CFLAGS="-I ~/lib/ingenic/cJSON/include -I ~/lib/ingenic/openssl/include -I ~/lib/ingenic/libuuid-1.0.3/include -I ~/lib/ingenic/cJSON/lib -I ~/lib/ingenic/openssl/lib -I ~/lib/ingenic/libuuid-1.0.3/lib" LDFLAGS="-L ~/lib/ingenic/cJSON/lib -L ~/lib/ingenic/openssl/lib -L ~/lib/ingenic/libuuid-1.0.3/lib -lssl -lcrypto -luuid"
```

```
make DESTDIR=~/lib/arm/mosquitto2.0.9 install
make DESTDIR=~/lib/arm/mosquitto2.0.12 install
```

<br/>

## cmake 设置

将所有头文件和 .so 库都添加到 CMakeLists.txt 里

<br/>

## 程序运行时链接动态库

将用到的 .so 文件都传到目标机，在环境变量 LD_LIBRARY_PATH 中指明库的搜索路径，再运行程序

```
export LD_LIBRARY_PATH=/tmp:$LD_LIBRARY_PATH
```
