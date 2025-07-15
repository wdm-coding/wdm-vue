module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [ // 限定提交类型必须为以下几种类型之一
			2,
			'always',
			['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'revert', 'build', 'perf']
		],
		'subject-case': [0] // 不限制大小写
	}
}
