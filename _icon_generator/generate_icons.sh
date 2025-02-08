#!/bin/bash

SCRIPT_DIR="$(dirname "$(realpath "$0")")"
OUTPUT_FILE_NAME="$SCRIPT_DIR/../global/js/fontawesome/icons.js"
INPUT_FILE="$SCRIPT_DIR/used_icons"
ALL_ICONS_FILE="$SCRIPT_DIR/all_icons"

FA_ATTRIBUTION="/*!
* Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
* License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
* Copyright 2024 Fonticons, Inc.
*/
"

echo "$FA_ATTRIBUTION" > "$OUTPUT_FILE_NAME"
echo "const icons = {" >> "$OUTPUT_FILE_NAME"

while IFS= read -r line; do
    grep "\"$line\"" "$ALL_ICONS_FILE" >> "$OUTPUT_FILE_NAME"
done < "$INPUT_FILE"

echo "};" >> "$OUTPUT_FILE_NAME"
