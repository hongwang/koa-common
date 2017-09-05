#!/bin/sh

# Usage
# ./bin/link.sh /home/hong/codes/hcd/raconteur/src

TARGET_PATH=$1
CURRENT_PATH=$(dirname "$0")
SRC_PATH="$CURRENT_PATH/../src"

if [ ! -d "$TARGET_PATH/common" ]; then
    mkdir "$TARGET_PATH/common"
fi

cd "$SRC_PATH"

for file in *.js; do
    if [ ! -e "$TARGET_PATH/common/$file" ]; then
        ln "$file" "$TARGET_PATH/common/$file"
    fi
done
