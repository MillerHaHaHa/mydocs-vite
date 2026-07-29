
## 编译 libnl 库

版本 libnl-3.11.0

```sh
#!/bin/bash

export PATH=$PATH:/home/huangmingle/projects/lndu/XMediaIPCLinuxV100R002C00SPC050/tools/toolchains/arm-gcc7.3-linux-musleabi/bin/

# 1. 设置你的交叉编译工具链前缀 (请根据实际情况修改)
TOOLCHAIN_PREFIX="arm-gcc7.3-linux-musleabi"

# 2. 设置安装路径 (请根据实际情况修改)
INSTALL_DIR="$PWD/.install"

# 3. 导出交叉编译工具链环境变量
export CC="${TOOLCHAIN_PREFIX}-gcc"
export CXX="${TOOLCHAIN_PREFIX}-g++"
export AR="${TOOLCHAIN_PREFIX}-ar"
export RANLIB="${TOOLCHAIN_PREFIX}-ranlib"
export STRIP="${TOOLCHAIN_PREFIX}-strip"

# 4. 配置编译选项
./configure \
    --host=${TOOLCHAIN_PREFIX%/} \
    --prefix=${INSTALL_DIR} \
    --disable-python \
    --disable-doc \
    --disable-test \
    --disable-static \
    CFLAGS="-O2 -fPIC" \
```

