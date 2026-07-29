# ubuntu22.04 移植笔记

## 1. yylloc 报错

在 source/kernel/linux-4.9.y/Makefile 中加入 HOSTCFLAGS  += -fcommon

```
diff --git a/Makefile b/Makefile
index 7a27a4a5..36bb7f03 100644
--- a/Makefile
+++ b/Makefile
@@ -304,6 +304,8 @@ HOSTCXX      = g++
 HOSTCFLAGS   = -Wall -Wmissing-prototypes -Wstrict-prototypes -O2 -fomit-frame-pointer -std=gnu89
 HOSTCXXFLAGS = -O2

+HOSTCFLAGS  += -fcommon
+
 ifeq ($(shell $(HOSTCC) -v 2>&1 | grep -c "clang version"), 1)
 HOSTCFLAGS  += -Wno-unused-value -Wno-unused-parameter \
                -Wno-missing-field-initializers -fno-delete-null-pointer-checks
```



## 2. 编译 xcam 和 sceneauto 遇到以下报错：

```
multiple definition of `MCREn'
...
```

在 source/sceneauto_v2/ini2bin/Makefile 加

CFLAGS += -fcommon



# ubuntu24.04 移植笔记

## 1. mksquashfs 段错误

```shell
huangmingle@d4eae5fb457d:~/projects/personal/desk-companion/XMIPCLinuxV100R005C00SPC050/open_source/squashfs$ diff -uprN tmp/squashfs4.3/ squashfs4.3 --exclude *.o --exclude mksquashfs --exclude unsquashfs
diff -uprN --exclude '*.o' --exclude mksquashfs --exclude unsquashfs tmp/squashfs4.3/squashfs-tools/mksquashfs.c squashfs4.3/squashfs-tools/mksquashfs.c
--- tmp/squashfs4.3/squashfs-tools/mksquashfs.c 2014-05-13 06:18:20.000000000 +0800
+++ squashfs4.3/squashfs-tools/mksquashfs.c     2026-07-27 10:43:08.337952672 +0800
@@ -50,6 +50,7 @@
 #include <sys/wait.h>
 #include <limits.h>
 #include <ctype.h>
+#include <sys/sysmacros.h>

 #ifndef linux
 #define __BYTE_ORDER BYTE_ORDER
diff -uprN --exclude '*.o' --exclude mksquashfs --exclude unsquashfs tmp/squashfs4.3/squashfs-tools/mksquashfs.h squashfs4.3/squashfs-tools/mksquashfs.h
--- tmp/squashfs4.3/squashfs-tools/mksquashfs.h 2014-05-10 12:54:13.000000000 +0800
+++ squashfs4.3/squashfs-tools/mksquashfs.h     2026-07-27 10:44:14.212756064 +0800
@@ -132,7 +132,7 @@ struct append_file {
 #define BLOCK_OFFSET 2

 extern struct cache *reader_buffer, *fragment_buffer, *reserve_cache;
-struct cache *bwriter_buffer, *fwriter_buffer;
+extern struct cache *bwriter_buffer, *fwriter_buffer;
 extern struct queue *to_reader, *to_deflate, *to_writer, *from_writer,
        *to_frag, *locked_fragment, *to_process_frag;
 extern struct append_file **file_mapping;
diff -uprN --exclude '*.o' --exclude mksquashfs --exclude unsquashfs tmp/squashfs4.3/squashfs-tools/unsquashfs.c squashfs4.3/squashfs-tools/unsquashfs.c
--- tmp/squashfs4.3/squashfs-tools/unsquashfs.c 2014-05-13 06:18:35.000000000 +0800
+++ squashfs4.3/squashfs-tools/unsquashfs.c     2026-07-27 10:43:41.014835897 +0800
@@ -37,6 +37,7 @@
 #include <sys/resource.h>
 #include <limits.h>
 #include <ctype.h>
+#include <sys/sysmacros.h>

 struct cache *fragment_cache, *data_cache;
 struct queue *to_reader, *to_inflate, *to_writer, *from_writer;
```

