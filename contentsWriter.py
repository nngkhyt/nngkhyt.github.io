import os 

# 最大出力ファイル数を指定
MAX_FILE = 10000

# 現在のディレクトリを取得
current_directory = os.getcwd()

# ディレクトリツリーを記述する
def describe_directory_tree(directory, show_hidden=False):
    tree_lines = []
    for root, dirs, files in os.walk(directory):
        if not show_hidden:
            # 隠しディレクトリを除外
            dirs[:] = [d for d in dirs if not d.startswith('.')]
            files = [f for f in files if not f.startswith('.')]
        level = root.replace(directory, '').count(os.sep)
        indent = '| ' * (level - 1) + ('-----' if level > 0 else '')
        tree_lines.append(f"{indent}{os.path.basename(root)}/")
        subindent = '| ' * level + '|-----'
        for file in files:
            tree_lines.append(f"{subindent}{file}")
    return '\n'.join(tree_lines)

# 出力するファイル名
output_filename = "fileContents.txt"

# スクリプト自身のファイル名(フルパスで取得)
script_file = os.path.abspath(__file__)

# ファイル内容をインデントして出力して保存する関数
def save_file_contents_with_tree_and_indent(directory, output_filename, max_files, show_hidden=False):
    file_count = 0
    with open(output_filename, 'w', encoding='utf-8') as output_file:
        # '[ファイル構成]'とディレクトリ構造を出力
        output_file.write("[ファイル構成]\n\n")
        tree = describe_directory_tree(directory, show_hidden)
        output_file.write(tree + "\n\n\n")
        # ディレクトリをたどってファイル内容を出力
        for root, dirs, files in os.walk(directory):
            if not show_hidden:
                # 隠しファイルとディレクトリを除外
                dirs[:] = [d for d in dirs if not d.startswith('.')]
                files = [f for f in files if not f.startswith('.')]
            for filename in files:
                if file_count >= max_files:
                    break  # ファイル数の上限に達したら処理を中断
                file_path = os.path.join(root, filename)
                # スクリプト自身と出力ファイルはスキップ
                if file_path == script_file or file_path == os.path.join(directory, output_filename):
                    continue
                try:
                    # ファイルコンテンツをメモリに読み込む
                    with open(file_path, 'r', encoding='utf-8') as file:
                        content_lines = file.readlines()
                    # ファイル名とファイルコンテンツを出力ファイルに書き込む
                    output_file.write(f"[{file_path}]\n\n")
                    for line in content_lines:
                        output_file.write(f"\t{line}")
                    output_file.write("\n\n\n")  # ファイル間の区切り
                    file_count += 1  # 出力したファイル数をカウント
                except Exception:
                    # 読み込みエラーが発生した場合、何も出力せずに次のファイルへ
                    continue
        if file_count >= max_files:
            output_file.write("\n[出力上限に達しました]\n")

# ファイル内容の保存を実行
save_file_contents_with_tree_and_indent(current_directory, output_filename, MAX_FILE, show_hidden=False)  # 隠しファイルを表示する場合はshow_hidden=True
