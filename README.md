#🚀 部署说明

本项目是一个极简书签导航站，它支持直接解析 **YAML** 数据格式。

---

## 🚀 Zeabur 部署步骤

### 创建项目
* 在 Zeabur 控制台创建新项目
* 选择合适的区域
### 创建服务
* 创建新服务
* 连接 GitHub 仓库：https://github.com/xxxxxx/nonav.git
### 配置部署
* 使用上面的 Dockerfile
* 暴露端口 8080
* 绑定域名
### 自动部署
* Zeabur 会自动：
* 克隆代码
* 安装依赖 (npm install)
* 构建项目 (npm run build 生成 links.json)
* 修改 index.html 中的路径
* 使用 Caddy 静态服务器提供文件

## ⚠️ 注意事项

### 构建失败？ 请确保您的项目根目录下存在 package.json Dockerfile 文件。

### 数据更新：
* 您只需在本地修改 links.yml 并推送到仓库 会自动触发构建并更新网页。
* Zeabur文件管理 /usr/share/caddy/data/links.yml 直接修改

### YAML 数据格式
本项目直接读取 `data/links.yml`，数据结构如下：
```yaml
- category: "常用工具"
  items:
    - name: "Google"
      url: "https://www.google.com"
      desc: "搜索万物"
- category: "Telegram专属"
  items:
    - name: "资源公社"
      url: "https://t.me/ZYGS123" # 自动识别为公开链接，显示频道群组 Logo
      desc: "公开频道群组"
