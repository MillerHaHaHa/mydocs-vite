# gperftools 使用

## 内存检测

## 1、使用方法 - 预加载方式

**链接库**

```makefile
-ltcmalloc_and_profiler
```

**添加环境变量**

**内存用量检测**

```
export HEAPPROFILE=linux_out.hprof
export HEAPPROFILESIGNAL=12
export HEAP_PROFILE_ALLOCATION_INTERVAL=524288
export LD_PRELOAD=/system/lib/libtcmalloc.so
/system/bin/app_main -f /system/config/config.json -d /userdata/device &
```

**内存泄漏检测**

```
HEAPCHECK=normal LD_PRELOAD="/system/lib/libtcmalloc.so" ./build_linux/linux_out
```

**运行程序**

**生成报告**

```
killall -12 linux_out
```

## 2、使用方法 - 头文件方式

**包含头文件**

```c_cpp
#include <gperftools/heap-profiler.h>
```

**调用函数**

开始调用

```c_cpp
int HeapProfilerStart(const char* fname); // fname是***.heap文件的前缀
```

**结束调用**

```c_cpp
void HeapProfilerDump(const char* reason);
void HeapProfilerStop();
```

**链接库**

```makefile
-ltcmalloc_and_profiler
```

**运行程序**

可以设置堆内存使用多大，生成一个片段 524288 512k

```sh
HEAP_PROFILE_ALLOCATION_INTERVAL=10485760  ./bin/kvsWebrtcClientMaster
```

**结束程序，生成 heap**

<br/>

## 2、生成分析报告

### 2.1 heap profiler

```sh
pprof --pdf --lines --heapcheck --alloc_space build_linux/linux_out linux_out.hprof.0001.heap > out.pdf
```

```sh
pprof --pdf --inuse_objects --lines --heapcheck  --edgefraction=1e-10 --nodefraction=1e-10 build_linux/linux_out linux_out.heap.0001.heap > out.pdf
```

```sh
pprof  ./bin/kvsWebrtcClientMaster ./gmem/test.log.0001.heap > out.pdf  --lines   --inuse_objects --heapcheck --pdf --inuse_objects --lines --heapcheck  --edgefraction=1e-10 --nodefraction=1e-10 --text --cum
```

> 分析模式
> 
> --inuse_space    Display the number of in-use megabytes (i.e. space that has been allocated but not freed). This is the default.
--inuse_objects    Display the number of in-use objects (i.e. number of objects that have been allocated but not freed).
--alloc_space    Display the number of allocated megabytes. This includes the space that has since been de-allocated. Use this if you want to find the main allocation sites in the program.
--alloc_objects    Display the number of allocated objects. This includes the objects that have since been de-allocated. Use this if you want to find the main allocation sites in the program.

官网生成

```
pprof ./test "/tmp/test.3362._main_-end.heap" --inuse_objects --lines --heapcheck  --edgefraction=1e-10 --nodefraction=1e-10 --pdf > out.pdf
```

交叉报告

```
pprof ~/project/1016_ipc_application_fw_m219e/output/rootfs/system/bin/app_main m219e.0001.heap --lib_prefix ~/project/1016_ipc_application_fw_m219e/output/rootfs --inuse_objects --lines --heapcheck --edgefraction=1e-10 --nodefraction=1e-10 --pdf > leak.pdf
```

### 2.2 profiler

```sh
pprof --pdf build_linux/linux_out linux_out.prof > out.pdf
```

```sh
pprof --text --lines build_linux/linux_out linux_out.prof > out.txt
```

<br/>

## 3、安装

安装 libunwind： `sudo apt install libunwind-dev`

安装 gperftools：下载源码，`./configure & make & sudo make install`

<br/>

## 4、交叉编译

```
export PATH=$PATH:/opt/mips-gcc540-glibc222-64bit-r3.3.0/bin
export CC=mips-linux-uclibc-gnu-gcc
export CXX=mips-linux-uclibc-gnu-g++
export AR=mips-linux-uclibc-gnu-ar
export RANLIB=mips-linux-uclibc-gnu-ranlib
export LD=mips-linux-uclibc-gnu-ld
./autogen.sh
./configure --prefix=/home/miller/project/gperftools/output/m219e --host=mips-linux
```

<br/>

## 5、常见问题

### signal handler 27 被占用

其他调试工具，例如 gprof 占用了，去掉编译选项 -pd

<br/>

### 跟踪堆

```
#if USE_GPEFTOOL
#include <gperftools/malloc_extension_c.h>
#endif

int GetHeapSize() 
{
    #if USE_GPEFTOOL
    size_t heap_size;
    if (MallocExtension_GetNumericProperty("generic.heap_size", &heap_size)) {
        XLOG_WARN("Heap size: %lu\n", heap_size);
    } else {
        XLOG_ERROR("Failed to get heap size.\n");
    }
    #endif
    return 0;
}
```

<br/>

## 6、参考链接

[gperftools 官方文档](https://gperftools.github.io/gperftools/)
