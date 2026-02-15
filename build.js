const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const yamlFile = path.join(__dirname, 'data/links.yml');
const jsonFile = path.join(__dirname, 'links.json');

try {
    // 确保 data 目录存在
    if (!fs.existsSync(path.join(__dirname, 'data'))) {
        fs.mkdirSync(path.join(__dirname, 'data'));
    }

    const fileContents = fs.readFileSync(yamlFile, 'utf8');
    const data = yaml.load(fileContents);

    // 数据清洗与安全过滤
    const safeData = data.map(cat => ({
        category: (cat.category || '未分类').replace(/[<>]/g, ''), 
        items: (cat.items || []).filter(item => /^(https?:\/\/|\/)/i.test(item.url || ''))
            .map(item => ({
                name: (item.name || 'Unknown').replace(/[<>]/g, ''),
                url: item.url,
                desc: (item.desc || '').replace(/[<>]/g, '')
            }))
    })).filter(cat => cat.items.length > 0);

    fs.writeFileSync(jsonFile, JSON.stringify(safeData));
    console.log('✅ 构建成功：links.json 已生成');
} catch (e) {
    console.error('❌ 构建失败:', e);
    process.exit(1);
}
