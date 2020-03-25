module.exports = {
  description: '创建一个vue页面',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: '输入页面名称'
    }
  ],
  actions: () => {
    const name = '{{name}}'
    return [
      {
        type: 'add',
        path: `src/pages/${name}/index.html`,
        templateFile: 'plop-templates/page/html.hbs',
        data: {
          name
        }
      },
      {
        type: 'add',
        path: `src/pages/${name}/App.vue`,
        templateFile: 'plop-templates/page/vue.hbs',
        data: {
          name
        }
      },
      {
        type: 'add',
        path: `src/pages/${name}/index.js`,
        templateFile: 'plop-templates/page/js.hbs',
        data: {
          name
        }
      }
    ]
  }
}
