# linux 开发常用 bashrc 配置

```
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
alias r='pushd .. > /dev/null'
alias rr='pushd .. > /dev/null;pushd .. > /dev/null'
alias e='popd > /dev/null'
alias ee='popd > /dev/null;popd > /dev/null'
alias g='grep -rn'
alias go='grep -rnw'
alias vi='vim'
alias so='source build/env.sh'
alias cm='make clean;make all'
alias cmb='make clean;make build'
alias mm='make menuconfig'
alias f='find . -iname'
```
