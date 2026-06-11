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
