import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/regex-shorthand';

const ruleTester = avaRuleTester(test, {
	env: {
		es6: true
	},
	parserOptions: {
		sourceType: 'module'
	}
});

const error = {
	ruleId: 'regex-shorthand',
	message: 'Use regex shorthands to improve readability.'
};

ruleTester.run('regex-shorthand', rule, {
	valid: [ //TODO: test fixer
		'const foo = /\\d/',
		'const foo = /\\W/i',
		'const foo = /\\w/ig',
		'const foo = /[a-z]/ig',
		'const foo = /\\d*?/ig',
		'const foo = /[a-z0-9_]/',
		'const foo = new RegExp(\'\\d\')',
		'const foo = new RegExp(\'\\d\', \'ig\')',
		'const foo = new RegExp(\'\\d*?\')',
		'const foo = new RegExp(\'[a-z]\', \'i\')',
		'const foo = new RegExp(/\\d/)',
		'const foo = new RegExp(/\\d/ig)',
		'const foo = new RegExp(/\\d/, \'ig\')',
		'const foo = new RegExp(/\\d*?/)',
		'const foo = new RegExp(/[a-z]/, \'i\')',
		'const foo = new RegExp(/^[^*]*[*]?$/)',
		// found in https://github.com/sindresorhus/eslint-plugin-unicorn/issues/157
		'const foo = new RegExp(/^by @([a-zA-Z\\d-]+)/)', // ok: 41 tests passed
		'const foo = /^@([0-9])/' //the fixer return /^@(\d)/
	],
	invalid: [
		{
			// found in https://github.com/sindresorhus/eslint-plugin-unicorn/issues/157
			code: 'const foo = /^by @([a-zA-Z0-9-]+)/',
			errors: [error],
			output: 'const foo = /^by @([a-zA-Z\\d-]+)/'
		},
		{
			// simplified testcase (-1 char)
			code: 'const foo = /^b @([a-zA-Z0-9-]+)/',
			errors: [error],
			output: 'const foo = /^b @([a-zA-Z\\d-]+)/'
		},
		{
			// simplified testcase (-2 char)
			code: 'const foo = /^b@([a-zA-Z0-9-]+)/',
			errors: [error],
			output: 'const foo = /^b@([a-zA-Z\\d-]+)/'
		},
		{
			// simplified testcase (-2 char + a-z)
			code: 'const foo = /^b@([a-bA-Z0-9-]+)/',
			errors: [error],
			output: 'const foo = /^b@([a-bA-Z\\d-]+)/'
		},
		{
			// simplified testcase (-2 char + a)
			code: 'const foo = /^b@([aA-Z0-9-]+)/',
			errors: [error],
			output: 'const foo = /^b@([aA-Z\\d-]+)/'
		},
		{
			// simplified testcase (-2 char - a)
			code: 'const foo = /^b@([A-Z0-9-]+)/',
			errors: [error],
			output: 'const foo = /^b@([A-Z\\d-]+)/'
		},
		{
			// simplified testcase (-2 char - a)
			code: 'const foo = /^@([A-Z0-9-]+)/',
			errors: [error],
			output: 'const foo = /^@([A-Z\\d-]+)/'
		},
		{
			// simplified testcase (short)
			code: 'const foo = /^@([0-9-]+)/',
			errors: [error],
			output: 'const foo = /^@([\\d-]+)/'
		},
		{
			// simplified testcase (short)
			code: 'const foo = /^@([0-9-])/',
			errors: [error],
			output: 'const foo = /^@([\\d-])/'
		},
		{
			code: 'const foo = /[0-9]/',
			errors: [error],
			output: 'const foo = /\\d/'
		},
		{
			code: 'const foo = new RegExp(\'[0-9]\')',
			errors: [error],
			output: 'const foo = new RegExp(\'\\\\d\')'
		},
		{
			code: 'const foo = new RegExp("[0-9]")',
			errors: [error],
			output: 'const foo = new RegExp(\'\\\\d\')'
		},
		{
			code: 'const foo = new RegExp("\'[0-9]\'")',
			errors: [error],
			output: 'const foo = new RegExp(\'\'\\\\d\'\')'
		},
		{
			code: 'const foo = /[0-9]/ig',
			errors: [error],
			output: 'const foo = /\\d/ig'
		},
		{
			code: 'const foo = new RegExp(\'[0-9]\', \'ig\')',
			errors: [error],
			output: 'const foo = new RegExp(\'\\\\d\', \'ig\')'
		},
		{
			code: 'const foo = /[^0-9]/',
			errors: [error],
			output: 'const foo = /\\D/'
		},
		{
			code: 'const foo = /[A-Za-z0-9_]/',
			errors: [error],
			output: 'const foo = /\\w/'
		},
		{
			code: 'const foo = /[A-Za-z\\d_]/',
			errors: [error],
			output: 'const foo = /\\w/'
		},
		{
			code: 'const foo = /[a-zA-Z0-9_]/',
			errors: [error],
			output: 'const foo = /\\w/'
		},
		{
			code: 'const foo = /[a-zA-Z\\d_]/',
			errors: [error],
			output: 'const foo = /\\w/'
		},
		{
			code: 'const foo = /[A-Za-z0-9_]+[0-9]?\\.[A-Za-z0-9_]*/',
			errors: [error],
			output: 'const foo = /\\w+\\d?\\.\\w*/'
		},
		{
			code: 'const foo = /[a-z0-9_]/i',
			errors: [error],
			output: 'const foo = /\\w/i'
		},
		{
			code: 'const foo = /[a-z\\d_]/i',
			errors: [error],
			output: 'const foo = /\\w/i'
		},
		{
			code: 'const foo = /[^A-Za-z0-9_]/',
			errors: [error],
			output: 'const foo = /\\W/'
		},
		{
			code: 'const foo = /[^A-Za-z\\d_]/',
			errors: [error],
			output: 'const foo = /\\W/'
		},
		{
			code: 'const foo = /[^a-z0-9_]/i',
			errors: [error],
			output: 'const foo = /\\W/i'
		},
		{
			code: 'const foo = /[^a-z\\d_]/i',
			errors: [error],
			output: 'const foo = /\\W/i'
		},
		{
			code: 'const foo = /[^a-z\\d_]/ig',
			errors: [error],
			output: 'const foo = /\\W/ig'
		},
		{
			code: 'const foo = /[^\\d_a-z]/ig',
			errors: [error],
			output: 'const foo = /\\W/ig'
		},
		{
			code: 'const foo = new RegExp(/[0-9]/)',
			errors: [error],
			output: 'const foo = new RegExp(/\\d/)'
		},
		{
			code: 'const foo = new RegExp(/[0-9]/, \'ig\')',
			errors: [error],
			output: 'const foo = new RegExp(/\\d/, \'ig\')'
		},
		{
			code: 'const foo = new RegExp(/[0-9]/)',
			errors: [error],
			output: 'const foo = new RegExp(/\\d/)'
		},
		{
			code: 'const foo = new RegExp(/[0-9]/, \'ig\')',
			errors: [error],
			output: 'const foo = new RegExp(/\\d/, \'ig\')'
		}
	]
});
