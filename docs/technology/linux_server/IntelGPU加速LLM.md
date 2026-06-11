# Intel GPU 加速 LLM

安装 GPU 驱动

https://www.intel.cn/content/www/cn/zh/developer/articles/technical/run-llms-on-gpus-using-llama-cpp.html

https://www.intel.cn/content/www/cn/zh/developer/tools/oneapi/base-toolkit-download.html?packages=oneapi-toolkit&oneapi-toolkit-os=linux&oneapi-lin=apt



Enable oneAPI Runtime

```
source /opt/intel/oneapi/setvars.sh
```



编译 llama.cpp 报错 Could NOT find CURL.  Hint: to disable this feature, set -DLLAMA_CURL=OFF

安装 curl 开发库

`sudo apt install libcurl4-openssl-dev`  

或者 `libcurl4-nss-dev`/`libcurl4-gnutls-dev`



docker 成功部署

https://github.com/intel/ipex-llm/blob/main/docs/mddocs/DockerGuides/docker_cpp_xpu_quickstart.md

llama.cpp(`git clone https://github.com/ggml-org/llama.cpp`) 到容器中编译

原生脚本

```bash
#!/bin/bash

#  MIT license
#  Copyright (C) 2024 Intel Corporation
#  SPDX-License-Identifier: MIT
export ONEAPI_DEVICE_SELECTOR="level_zero:0"
source /opt/intel/oneapi/setvars.sh

#export GGML_SYCL_DEBUG=1

#ZES_ENABLE_SYSMAN=1, Support to get free memory of GPU by sycl::aspect::ext_intel_free_memory. Recommended to use when --split-mode = layer.

INPUT_PROMPT="Building a website can be done in 10 simple steps:\nStep 1:"
MODEL_FILE=/models/Qwen3-1.7B-Q8_0.gguf
NGL=99
CONTEXT=4096

if [ $# -gt 0 ]; then
    GGML_SYCL_DEVICE=$1
    echo "use $GGML_SYCL_DEVICE as main GPU"
    #use signle GPU only
    ZES_ENABLE_SYSMAN=1 ./build/bin/llama-cli -m ${MODEL_FILE} -p "${INPUT_PROMPT}" -n 400 -e -ngl ${NGL} -s 0 -c ${CONTEXT} -mg $GGML_SYCL_DEVICE -sm none

else
    #use multiple GPUs with same max compute units
    ZES_ENABLE_SYSMAN=1 ./build/bin/llama-cli -m ${MODEL_FILE} -p "${INPUT_PROMPT}" -n 400 -e -ngl ${NGL} -s 0 -c ${CONTEXT}
fi
```

## Qwen 运行脚本 交互式

```bash
export ONEAPI_DEVICE_SELECTOR="level_zero:0"
export ZES_ENABLE_SYSMAN=1 
```

测试结果

Qwen3-1.7B-Q8_0.gguf

```bash
./build/bin/llama-cli -m /models/Qwen3-1.7B-Q8_0.gguf --jinja --color -ngl 99 -fa -sm none --temp 0.6 --top-k 20 --top-p 0.95 --min-p 0 -c 40960 -n 32768 --no-context-shift -p "What is AI?"
```

i5-13500H（Intel(R) Graphics [0xa7a0]）

```
llama_perf_sampler_print:    sampling time =      91.31 ms /   693 runs   (    0.13 ms per token,  7589.36 tokens per second)
llama_perf_context_print:        load time =    1978.44 ms
llama_perf_context_print: prompt eval time =     533.19 ms /    12 tokens (   44.43 ms per token,    22.51 tokens per second)
llama_perf_context_print:        eval time =   75358.61 ms /   680 runs   (  110.82 ms per token,     9.02 tokens per second)
llama_perf_context_print:       total time =  547372.79 ms /   692 tokens
```

8600T（Intel UHD Graphics 630）

```
llama_perf_sampler_print:    sampling time =      91.17 ms /   618 runs   (    0.15 ms per token,  6778.32 tokens per second)
llama_perf_context_print:        load time =    3818.97 ms
llama_perf_context_print: prompt eval time =    1501.89 ms /    12 tokens (  125.16 ms per token,     7.99 tokens per second)
llama_perf_context_print:        eval time =  110596.13 ms /   605 runs   (  182.80 ms per token,     5.47 tokens per second)
llama_perf_context_print:       total time =  120081.00 ms /   617 tokens
```



Qwen3-0.6B-Q8_0.gguf

```bash
./build/bin/llama-cli -m /models/Qwen3-0.6B-Q8_0.gguf --jinja --color -ngl 99 -fa -sm none --temp 0.6 --top-k 20 --top-p 0.95 --min-p 0 -c 40960 -n 32768 --no-context-shift -p "What is AI?"
```

i5-13500H（Intel(R) Graphics [0xa7a0]）

```
llama_perf_sampler_print:    sampling time =      38.06 ms /   326 runs   (    0.12 ms per token,  8564.52 tokens per second)
llama_perf_context_print:        load time =    1485.99 ms
llama_perf_context_print: prompt eval time =     331.18 ms /    12 tokens (   27.60 ms per token,    36.23 tokens per second)
llama_perf_context_print:        eval time =   22438.25 ms /   313 runs   (   71.69 ms per token,    13.95 tokens per second)
llama_perf_context_print:       total time =   27664.20 ms /   325 tokens
```



Qwen3-4B-Q4_K_M.gguf

```bash
./build/bin/llama-cli -m /models/Qwen3-4B-Q4_K_M.gguf --jinja --color -ngl 99 -fa -sm none --temp 0.6 --top-k 20 --top-p 0.95 --min-p 0 -c 40960 -n 32768 --no-context-shift -p "What is AI?"
```





## Qwen 运行脚本 server

```bash
export ONEAPI_DEVICE_SELECTOR="level_zero:0"
export ZES_ENABLE_SYSMAN=1
```

```bash
./build/bin/llama-server -m /models/Qwen3-1.7B-Q8_0.gguf --jinja --reasoning-format deepseek -ngl 99 -fa -sm none --temp 0.6 --top-k 20 --top-p 0.95 --min-p 0 -c 40960 -n 32768 --no-context-shift --host 192.168.145.5
```

```bash
./build/bin/llama-server -m /models/Qwen3-0.6B-Q8_0.gguf --jinja --reasoning-format deepseek -ngl 99 -fa -sm none --temp 0.6 --top-k 20 --top-p 0.95 --min-p 0 -c 40960 -n 32768 --no-context-shift --host 192.168.145.5
```

```bash
./build/bin/llama-server -m /models/Qwen3-4B-Q4_K_M.gguf --jinja --reasoning-format deepseek -ngl 99 -fa -sm none --temp 0.6 --top-k 20 --top-p 0.95 --min-p 0 -c 40960 -n 32768 --no-context-shift --host 192.168.145.5
```

