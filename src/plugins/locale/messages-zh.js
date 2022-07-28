const messages = {
    "": {
        "language": "zh-CN",
        "plural-forms": "nplurals=2; plural=n>1;"
    },
    "Server error: please check console output and make sure server is on": "服务器错误：请确认 pyarmor-webui 后台服务已经在运行，并检查控制台输出",
    "Could not connect to pyarmor server, make sure it runs on %1": "无法连接到后台服务：%1",

    "My Projects": "我的工程",
    "My Licenses": "我的许可证",
    "Please type pyarmor server url:": "输入 pyarmor 后台服务地址：",
    "Connect": "连接",

    // src/components/SelectLicenseFile.vue 13
    "Select one license file to restrict the obfuscated script": "选择加密脚本的许可证",

    // src/components/SelectLicenseFile.vue 73
    "Default license, no any restrict": "使用默认许可证",

    // src/components/SelectLicenseFile.vue 77
    "Do not include license file": "不使用许可证",

    // src/components/HomeTabIndex.vue 3
    "Home": "首页",

    // src/components/HomeTabIndex.vue 12
    // src/pages/ObfuscatePageWizard.vue 5
    "Obfuscate Script Wizard": "加密脚本向导",

    // src/components/HomeTabIndex.vue 23
    "Obfuscate With Project": "使用工程加密",

    // src/components/HomeTabIndex.vue 34
    // src/pages/PackPageWizard.vue 5
    "Pack Script Wizard": "加密打包向导",

    // src/components/HomeTabIndex.vue 45
    "Pack With Project": "使用工程打包",

    // src/components/HomeTabIndex.vue 56
    "Generate Expired License": "时间限制许可证",

    // src/components/HomeTabIndex.vue 67
    "Fixed Machine License": "指定设备许可证",

    // src/components/HomeTabIndex.vue 78
    "Full Features License": "全部特征许可证",

    // src/components/HomeTabIndex.vue 89
    "Register PyArmor": "注册 PyArmor",

    // src/components/HomeTabIndex.vue 97
    "Please click Register if there is pyarmor-regfile-1.zip in current path. Or select one from other path at first": "如果注册文件 pyarmor-regfile-1.zip 在当前路径，直接点击注册即可，否则请首先从其他目录选择一个注册文件",
    "Please type registration code or full path filename": "请输入注册码或者全路径注册文件名称",

    // src/components/HomeTabIndex.vue 103
    "No registration code or file?": "还没有注册码或者注册文件？",

    // src/components/HomeTabIndex.vue 108
    "https://order.shareit.com/cart/add?vendorid=200089125&PRODUCT[300871197]=1": "http://pyarmor.dashingsoft.com/cart/order.html",

    // src/components/HomeTabIndex.vue 109
    "Click here to purchase one": "点击这里购买",

    // src/components/HomeTabIndex.vue 112
    "Cancel": "取消",

    // src/components/HomeTabIndex.vue 113
    "Register": "注册",

    // src/components/HomeTabIndex.vue 153
    "Register PyArmor successfully": "PyArmor 注册成功",

    // src/components/HomeTabIndex.vue 157
    "regfile is empty": "没有注册文件",

    // src/components/SelectPlatform.vue 9
    "High Security": "高安全性",

    // src/components/SelectPlatform.vue 12
    "High Speed": "高性能",

    // src/components/SelectPlatform.vue 25
    "Cross platform, select one or more platforms to run obfuscated scripts": "用于跨平台发布，选择运行加密脚本的目标平台",

    // src/components/HomeTabAbout.vue 3
    "About": "关于",

    // src/components/HomeTabAbout.vue 15
    "PyArmor server is not running on": "PyArmor 后台服务没有启动",

    // src/components/HomeTabAbout.vue 15
    "Make sure the server is running, or click here to": "请确认后台服务已经启动，或者点击这里",

    // src/components/HomeTabAbout.vue 19
    "connect another server url": "连接其他地址的后台服务",

    // src/components/HomeTabAbout.vue 23
    "PyArmor is a powerful tool in the field of protecting and distributing python scripts.": "PyArmor 是一个用于加密保护和发布 Python 脚本的强大工具。",

    // src/components/HomeTabAbout.vue 24
    "The goal of PyArmor is to make Python applied to commercial application easily.": "PyArmor 的目标是让 Python 可以更广泛的应用于商业软件。",

    // src/components/HomeTabAbout.vue 32
    "Homepage": "主页",

    // src/components/HomeTabAbout.vue 39
    "https://pyarmor.readthedocs.io/en/stable/": "https://pyarmor.readthedocs.io/zh/stable/",

    // src/components/HomeTabAbout.vue 39
    "Documentation": "文档",

    // src/components/HomeTabAbout.vue 46
    "https://pyarmor.readthedocs.io/en/stable/license.html": "https://pyarmor.readthedocs.io/zh/stable/license.html",

    // src/components/HomeTabAbout.vue 46
    "License & Purchase": "许可和购买",

    // src/components/HomeTabAbout.vue 53
    "Report Issues": "报告问题",

    // src/components/HomeTabAbout.vue 60
    "Contact": "联系方式",

    // src/components/HomeTabAbout.vue 63
    "Copyright @ 2008 - 2020 Dashingsoft Corp.": "版权所有 @ 2008 - 2020 西安德新软件",

    // src/components/SelectPlatform.vue
    "Common": "常用",
    "Others": "其它",
    "VM Protection": "虚拟模式",

    // src/components/SelectFolder.vue 41
    "Parent directory": "上一级目录",

    // src/components/SelectFolder.vue 45
    "Restore init value": "恢复初始值",

    // src/components/SelectFolder.vue 49
    "Root path and favorite paths": "根目录和常用目录",

    // src/components/SelectFolder.vue 53
    "Create new path": "创建新目录",

    // src/components/SelectFolder.vue 57
    "Delete an empty path": "删除空目录",

    // src/components/SelectFolder.vue 61
    "Accept path": "接受当前选中的目录",

    // src/components/SelectFolder.vue 172
    "This is top path": "已经是最上层目录",

    // src/components/SelectFolder.vue 186
    // src/pages/ProjectPageEdit.vue 218
    "Input": "输入对话框",

    // src/components/SelectFolder.vue 198
    // src/components/HomeTabLicense.vue 105
    // src/components/HomeTabProject.vue 142
    "Confirm": "确认",

    // src/components/HomeTabLicense.vue 4
    // src/components/HomeTabProject.vue 4
    "New": "创建",

    // src/components/HomeTabLicense.vue 6
    // src/components/HomeTabProject.vue 6
    "Refresh": "刷新",

    // src/components/HomeTabLicense.vue 17
    // src/pages/LicensePageEdit.vue 27
    "Expired": "有效期",

    // src/components/HomeTabLicense.vue 20
    // src/pages/LicenseInputMachine.vue 4
    "Harddisk": "硬盘序列号",

    // src/components/HomeTabLicense.vue 23
    "IPv4": "IPv4",

    // src/components/HomeTabLicense.vue 26
    "Mac Address": "网卡MAC地址",

    // src/components/HomeTabLicense.vue 29
    // src/pages/LicensePageEdit.vue 43
    "Disable Restrict Mode": "禁用约束模式",

    // src/components/HomeTabLicense.vue 32
    // src/pages/LicensePageEdit.vue 57
    "Extra Data": "自定义数据",

    // src/components/HomeTabLicense.vue 35
    "Filename": "文件名称",

    // src/components/HomeTabLicense.vue 44
    // src/components/HomeTabProject.vue 38
    // src/pages/LicensePageEdit.vue 16
    "Name": "名称",

    // src/components/HomeTabLicense.vue 49
    "Summary": "说明",

    // src/components/HomeTabLicense.vue 56
    "Edit this license": "编辑许可证",

    // src/components/HomeTabLicense.vue 66
    "Remove this license": "删除许可证",

    // src/components/HomeTabProject.vue 18
    // src/pages/ProjectInputFile.vue 6
    "Src": "源路径",

    // src/components/HomeTabProject.vue 21
    "Entry": "主脚本",

    // src/components/HomeTabProject.vue 24
    // src/pages/PackPageWizard.vue 116
    // src/pages/ObfuscatePageWizard.vue 35
    // src/pages/ProjectInputTarget.vue 4
    "Output": "输出路径",

    // src/pages/ProjectPageEdit.vue 47
    "Target": "输出",

    // src/components/HomeTabProject.vue 30
    "Path": "工程路径",

    // src/components/HomeTabProject.vue 47
    "Title": "标题",

    // src/components/HomeTabProject.vue 54
    "Build this project": "构建这个工程",

    // src/components/HomeTabProject.vue 59
    "Build with debug information in case something is wrong": "打开调试开关进行构建",

    // src/components/HomeTabProject.vue 64
    "Remove this project": "删除这个工程",

    // src/components/HomeTabProject.vue 69
    "Edit this project": "编辑这个工程",

    // src/components/HomeTabProject.vue 98
    // src/pages/ProjectPageEdit.vue 32
    "Obfuscate all scripts in project": "加密工程中的所有脚本",

    // src/components/HomeTabProject.vue 121
    // src/pages/ProjectPageEdit.vue 186
    "Building ": "构建工程 ",

    // src/pages/ProjectPageEdit.vue 75
    "Build": "构建 ",

    // src/pages/ProjectPageEdit.vue 78
    "Diagnose": "构建（调试） ",

    // src/components/HomeTabProject.vue 134
    // src/pages/ProjectPageEdit.vue 199
    "Diagnosing project ": "使用调试模式构建工程 ",

    // src/pages/PackPageWizard.vue 10
    // src/pages/ObfuscatePageWizard.vue 10
    "Start": "开始",

    // src/pages/PackPageWizard.vue 12
    "Data Files": "数据文件",

    // src/pages/PackPageWizard.vue 54
    "Hidden Imports": "隐含模块",

    // src/pages/PackPageWizard.vue 54
    "Binary Files": "动态库文件",

    // src/pages/PackPageWizard.vue 44
    "Icon": "图标",

    // src/pages/PackPageWizard.vue 14
    // src/pages/PackPageWizard.vue 104
    "Extra Options": "其他选项",

    // src/pages/PackPageWizard.vue 16
    // src/pages/ObfuscatePageWizard.vue 14
    "Finish": "结束",

    // src/pages/PackPageWizard.vue 28
    "Base path for entry script, data files, binary files etc.": "所有其他文件名称的相对路径",

    // src/pages/PackPageWizard.vue 34
    // src/pages/ProjectInputFile.vue 27
    "Script": "主脚本",

    // src/pages/PackPageWizard.vue 36
    "The entry script": "选择相对于源路径的脚本文件",

    // src/pages/PackPageWizard.vue 46
    "No obfuscated scripts in these paths": "排除不需要加密的路径，例如 venv，test 等",

    // src/pages/PackPageWizard.vue 61
    "Type module or package name, then press ENTER": "输入模块名称，然后按下回车键",

    // src/pages/PackPageWizard.vue 62
    "Name an import not visible in the code of the script(s)": "输入脚本中隐式导入的模块名称",

    // src/pages/PackPageWizard.vue 73
    "Additional data files or folders to be added to the executable": "需要打包的数据文件",

    // src/pages/PackPageWizard.vue 74
    "Type file name or path name relative to src, then press ENTER": "输入相对于源路径的文件名称，然后按下回车键",

    // src/pages/PackPageWizard.vue 85
    "Additional binary files to be added to the executable": "需要打包的二进制动态库",

    // src/pages/PackPageWizard.vue 86
    "Type binary filename relative to src, then press ENTER": "输入相对于源路径的二进制文件名称，然后按下回车键",

    // src/pages/PackPageWizard.vue 92
    "No Console": "控制台",

    // src/pages/PackPageWizard.vue 94
    "Do not provide a console window for standard I/O": "最终的可执行文件在运行时候是否显示控制台",

    // src/pages/PackPageWizard.vue 100
    "Apply icon to a Windows executable or the bundle on Mac OS X": "输入相对于源路径的图标文件（Windows 和 MacOS）",

    // src/pages/PackPageWizard.vue 109
    "Any other PyInstaller options to append command line": "输入其他 PyInstaller 支持的选项",

    // src/pages/PackPageWizard.vue 118
    // src/pages/ObfuscatePageWizard.vue 37
    // src/pages/ProjectInputTarget.vue 6
    "The default output path is $src/dist": "默认的输出路径是源路径下面的 dist 目录",

    // src/pages/PackPageWizard.vue 124
    "Bundle": "打包成",

    // src/pages/PackPageWizard.vue 126
    // src/pages/ProjectInputTarget.vue 86
    "Name to the bundled app (default: basename of entry script)": "输入最终打包好的文件名称，默认是主脚本的名称",

    // src/pages/PackPageWizard.vue 132
    "all to one folder": "一个目录",

    // src/pages/PackPageWizard.vue 133
    "all to one file": "一个文件",

    // src/pages/PackPageWizard.vue 134
    "all to one file with outer license": "一个文件（无许可证）",

    // src/pages/PackPageWizard.vue 153
    "Pack": "打包",

    // src/pages/PackPageWizard.vue 161
    "Close": "关闭",

    // src/pages/PackPageWizard.vue 168
    "Prev": "上一步",

    // src/pages/PackPageWizard.vue 174
    "Next": "下一步",

    // src/pages/PackPageWizard.vue 282
    "Packing script ": "正在打包脚本 ",

    // src/pages/ProjectInputMisc.vue 4
    "Restrict Mode": "约束模式",

    // src/pages/ProjectInputMisc.vue 7
    "https://pyarmor.readthedocs.io/en/latest/mode.html#restrict-mode": "https://pyarmor.readthedocs.io/zh/stable/mode.html#restrict-mode",

    // src/pages/ProjectInputMisc.vue 11
    "Select restrict mode": "选择约束模式",

    // src/pages/ProjectInputMisc.vue 21
    "Bootstrap Code": "引导模式",

    // src/pages/ProjectInputMisc.vue 25
    "Select entry mode": "选择引导代码插入模式",

    // src/pages/ProjectInputMisc.vue 35
    "Enable Suffix": "后缀模式",

    // src/pages/ProjectInputMisc.vue 38
    "Generate runtime package with an unique suffix": "创建包含唯一后缀的运行辅助包，解决导入其他用户的加密包冲突问题",

    // src/pages/ProjectInputMisc.vue 35
    "Enable Mix-String": "加密字符串",
    "Mix all the string values in the scripts": "混淆脚本中所有字符串值（不包括函数/变量名称）",

    // src/pages/ProjectInputMisc.vue 60
    "DO NOT insert bootstrap code into entry scripts": "不要插入引导代码到主脚本",

    // src/pages/ProjectInputMisc.vue 64
    "Insert bootstrap code into entry scripts": "自动插入引导代码到主脚本（默认）",

    // src/pages/ProjectInputMisc.vue 68
    "Generate bootstrap code without leading dot (absolute import)": "引导代码使用绝对导入方式（没有前置的点）",

    // src/pages/ProjectInputMisc.vue 72
    "Generate bootstrap code with leading dot (relative import)": "引导代码使用包含前置点的相对导入方式",

    // src/pages/ProjectInputMisc.vue 78
    "Mode 0: disable all the restricts for the obfuscated scripts": "模式 0：禁用所有约束功能",

    // src/pages/ProjectInputMisc.vue 82
    "Mode 1: the obfuscated scripts can not be changed": "模式 1：加密后的脚本不可以被修改",

    // src/pages/ProjectInputMisc.vue 86
    "Mode 2: mode 1 plus can not be imported by plain scripts": "模式 2：模式 1 + 加密脚本不可以被非加密脚本导入",

    // src/pages/ProjectInputMisc.vue 90
    "Mode 3: mode 2 plus module attributes protection": "模式 3：同模式 2 并且模块属性得到保护",

    // src/pages/ProjectInputMisc.vue 94
    "Mode 4: mode 3 but for package": "模式 4：同模式 3 但可用于加密包",
    "Mode 5: mode 4 plus frame globals protection": "模式 5：同模式 4 并且运行时全局变量得到保护",

    // src/pages/ProjectInputMisc.vue
    "Mode 101: mode 1 plus module dictionary protection": "模式 101: 同模式 1 并且保护模字典",
    "Mode 102: mode 2 plus module dictionary protection": "模式 102: 同模式 2 并且保护模字典",
    "Mode 103: mode 3 plus module dictionary protection": "模式 103: 同模式 3 并且保护模字典",
    "Mode 104: mode 4 plus module dictionary protection": "模式 104: 同模式 4 并且保护模字典",
    "Mode 105: mode 5 plus module dictionary protection": "模式 105: 同模式 5 并且保护模字典",

    // src/pages/LicenseInputMachine.vue 6
    "Bind obfuscated scripts to this serial number of harddisk": "绑定加密脚本到硬盘序列号",

    // src/pages/LicenseInputMachine.vue 13
    "Bind obfuscated scripts to this IPv4 address": "绑定加密脚本到 IPv4 地址",

    // src/pages/LicenseInputMachine.vue 20
    "Bind obfuscated scripts to this MAC address": "绑定加密脚本到网卡 Mac 地址",

    // src/pages/ObfuscatePageWizard.vue 12
    "Advanced": "高级",

    // src/pages/ObfuscatePageWizard.vue 26
    // src/pages/ProjectInputMode.vue 9
    "Cross Protection": "交叉保护",

    // src/pages/ObfuscatePageWizard.vue 28
    // src/pages/ProjectInputMode.vue 11
    "Inject cross protection code into entry scripts before obfuscating": "加密时注入交叉保护代码到主脚本以提高安全性",

    // src/pages/ObfuscatePageWizard.vue 44
    "Package Name": "包名称",

    // src/pages/ObfuscatePageWizard.vue 48
    "Append this name to output path": "输出目录中包含包的名称",

    // src/pages/ObfuscatePageWizard.vue 57
    // src/pages/ProjectInputTarget.vue 32
    "Platforms": "运行平台",

    // src/pages/ObfuscatePageWizard.vue 63
    // src/pages/ProjectInputTarget.vue 25
    "License": "许可证",

    // src/pages/ObfuscatePageWizard.vue 75
    "Obfuscate": "加密",

    // src/pages/ObfuscatePageWizard.vue 193
    "Obfuscate scripts: ": "加密脚本",

    // src/pages/ProjectInputMode.vue 3
    "Advanced Mode": "高级模式",
    "Disable or select advanced mode": "禁用或者选择一种高级模式",

    // src/pages/ProjectInputMode.vue 5
    "Change code object structure to improve security (only for x86/64 arch)": "修改代码结构以提高安全性（仅 x86/64 可用）",
    "Disable advanced mode": "禁用高级模式",
    "Enable advanced mode (only for x86/64 arch)": "启用高级模式（仅 x86/64 平台可用）",
    "Enable super mode (only for Python 27, 37, 38, 39)": "启用超级模式（仅 Python 27，37，38，39 支持）",
    "Enable advanced mode plus vm protection (only for Windows)": "同时启用高级模式和虚拟模式（仅 Windows 平台可用）",
    "Enable super mode plus vm protection (only for Python 27, 37, 38, 39 in Windows)": "同时启用超级模式和超级模式（仅 Windows 平台的 Python 27，37，38，39 支持）",
    "Enable super plus mode (only for Python 37, 38, 39 and x86_64)": "启用终极模式（仅 x86_64 架构的 Python 37, 38, 39 可用）",

    // src/pages/ProjectInputMode.vue 15
    "Obfuscate Module": "模块加密模式",

    // src/pages/ProjectInputMode.vue 17
    "Obfuscate the whole module": "加密整个模块对象",

    // src/pages/ProjectInputMode.vue 21
    "Obfuscate Code Object": "函数加密模式",

    // src/pages/ProjectInputMode.vue 23
    "Obfuscate each function (code object) in the module": "对模块中的每一个函数分别进行加密",
    "Do not obfuscate functions": "不对函数进行单独加密",
    "Obfuscate each function with quick algorithm": "使用快速加密算法加密模块中的每一个函数",
    "Obfuscate each function with complex algorithm": "使用复杂加密算法加密模块中的每一个函数",

    // src/pages/ProjectInputMode.vue 27
    "Wrap Code Object": "动态加密模式",

    // src/pages/ProjectInputMode.vue 29
    "Obfuscate each function (code object) in runtime": "函数运行结束之后再次加密",

    // src/pages/ProjectInputTarget.vue 13
    "Bundle Name": "输出包名称",

    // src/pages/ProjectInputTarget.vue 39
    "Plugins": "插件",

    // src/pages/ProjectInputTarget.vue 52
    "Type plugin name, then press ENTER": "输入插件名称，然后按下回车键",

    // src/pages/ProjectInputTarget.vue 61
    "Pack Options": "打包选项",

    // src/pages/ProjectInputTarget.vue 66
    "Please input any pyinstaller option": "输入 PyInstaller 支持的其他选项",

    // src/pages/ProjectInputTarget.vue 87
    "Append this name to output path for package": "在输出目录中包含这里输入的名称",

    // src/pages/ProjectPageEdit.vue 6
    // src/pages/ProjectPageEdit.vue 8
    "Edit Project": "编辑工程",

    // src/pages/ProjectPageEdit.vue 6
    // src/pages/ProjectPageEdit.vue 9
    "New Project": "新增工程",

    // src/pages/ProjectPageEdit.vue 26
    "Basic": "基本",

    // src/components/HomeTabProject.vue 27
    // src/pages/ProjectPageEdit.vue 27
    "Type": "类型",

    // src/components/HomeTabProject.vue 98
    // src/pages/ProjectPageEdit.vue 35
    "Pack all to one folder": "打包成为一个目录",

    // src/components/HomeTabProject.vue 99
    // src/pages/ProjectPageEdit.vue 38
    "Pack all to one file": "打包成为单文件",

    // src/components/HomeTabProject.vue 99
    // src/pages/ProjectPageEdit.vue 41
    "Pack all to one file with outer license": "打包成为单文件（不包含许可证）",

    // src/pages/ProjectPageEdit.vue 50
    "Obfuscate Mode": "加密模式",

    // src/pages/ProjectPageEdit.vue 53
    "Advanced Options": "高级选项",

    // src/pages/ProjectPageEdit.vue 56
    "Runtime Files": "运行辅助文件",

    // src/pages/ProjectPageEdit.vue 72
    "Create": "创建",

    // src/pages/ProjectPageEdit.vue 72
    "Update": "更新",

    // src/pages/ProjectPageEdit.vue 143
    "DO NOT generate runtime files": "不生成运行辅助文件",

    // src/pages/ProjectPageEdit.vue 147
    "Generate runtime files as a module pytransform": "生成运行辅助文件",

    // src/pages/ProjectPageEdit.vue 151
    "Generate runtime files as a package pytransform": "生成运行辅助包 pytransform（默认）",

    // src/pages/ProjectPageEdit.vue 218
    "Please input project title": "新的工程标题",

    // src/pages/ProjectInputFile.vue 8
    "Base path for scripts, include and exclude": "源路径是其他文件和目录的相对路径",

    // src/pages/ProjectInputFile.vue 14
    "Scripts": "脚本",

    // src/pages/ProjectInputFile.vue 16
    "Select one or more entry scripts": "选择一个或者多个入口脚本",

    // src/pages/ProjectInputFile.vue 29
    "Select one entry script": "选择一个入口脚本",

    // src/pages/ProjectInputFile.vue 38
    "Include": "搜索模式",

    // src/pages/ProjectInputFile.vue 51
    "Exclude": "排除路径",

    // src/pages/ProjectInputFile.vue 53
    "Ignore the path and the .py files list here": "这些路径下面的所有脚本不会被加密",

    // src/pages/ProjectInputFile.vue 71
    "Only the scripts list above": "仅仅加密列出的这些脚本文件",

    // src/pages/ProjectInputFile.vue 75
    "Only the .py files in the src path": "仅仅加密源路径下面的脚本文件",

    // src/pages/ProjectInputFile.vue 79
    "All the scripts in the src path recursively": "递归加密源路径下面的所有脚本文件",

    // src/pages/LicensePageEdit.vue 5
    "Edit License": "编辑许可证",

    // src/pages/LicensePageEdit.vue 5
    "New License": "创建许可证",

    // src/pages/LicensePageEdit.vue 22
    "Leave it blank to set default name like reg-xxxxxx": "默认名称是 reg-xxxxxx",

    // src/pages/LicensePageEdit.vue 33
    "Expired the obfuscated scripts": "设置加密脚本有效期",

    // src/pages/LicensePageEdit.vue 50
    "Enable Period Mode": "启用周期模式",

    // src/pages/LicensePageEdit.vue 59
    "Any ascii string data to store in the license file": "自定义的任何字符串数据",

    // src/pages/LicensePageEdit.vue 115
    "Invalid input": "非法输入",

    // src/components/SelectFolder.vue 186
    "Please type path to create in %1": "在 %1 下面创建下面输入的路径：",

    // src/components/SelectFolder.vue 192
    "This path has been created: %1": "路径 %1 已经被创建",

    // src/components/SelectFolder.vue 198
    "Are you sure to remove this path: %1 ?": "你确认要删除这个路径 %1 吗？",

    // src/components/HomeTabLicense.vue 105
    "Are you sure remove this license: %1 ?": "你确认要删除这个许可证 %1 吗？",

    // src/components/HomeTabProject.vue 116
    // src/components/HomeTabProject.vue 129
    // src/pages/ProjectPageEdit.vue 181
    // src/pages/ProjectPageEdit.vue 194
    "Build successfully, the results saved in: %1": "构建成功，输出目录：%1",

    // src/components/HomeTabProject.vue 142
    "Are you sure remove this project: %1 ?": "你确认要删除这个工程 %1 吗？",

    // src/pages/PackPageWizard.vue 286
    "Pack obfuscated scripts successfully, the final bundle is saved: %1": "加密打包成功，输出结果：%1",

    // src/pages/ObfuscatePageWizard.vue 197
    "Obfuscate the scripts successfully, the result is saved to %1": "加密脚本成功，输出目录：%1",

    // src/pages/ProjectPageEdit.vue 212
    "The project %1 has been created": "工程 %1 已经被成功创建",
    "The project %1 has been updated": "工程 %1 已经被更新",

    // src/pages/LicensePageEdit.vue 161
    "The license has been saved to %1": "许可证已经被保存在 %1",
}

export default messages
