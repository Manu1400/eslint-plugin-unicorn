'use strict';
// TODO: uninstall this dependency
// const cleanRegexp = require('clean-regexp')

const {parse, generate, optimize} = require('regexp-tree');

const getDocsUrl = require('./utils/get-docs-url');

const message = 'Use regex shorthands to improve readability.'; // '{{value}} can be optimized to {{optimizedRegex}}'

const create = context => {
	const sourceCode = context.getSourceCode();
	const options = context.options[0] || [
		'charClassToMeta', // [0-9] -> [\d]
		'charClassToSingleChar' // [\d] -> \d
	];

	return {
		'Literal[regex]': node => {
			const {type, value} = sourceCode.getFirstToken(node);

			if (type !== 'RegularExpression') {
				return;
			}

			let parsedSource;
			try {
				parsedSource = parse(value);
			} catch (error) {
				context.report({
					node,
					message: '{{original}} can\'t be parsed: {{message}}',
					data: {
						original: value,
						message: error.message
					}
				});

				return;
			}

			const originalRegex = generate(parsedSource).toString();
			const optimizedRegex = optimize(value, options).toString();

			if (originalRegex === optimizedRegex) {
				return;
			}

			context.report({
				node,
				message,
				data: {
					value,
					optimizedRegex
				},
				fix(fixer) {
					return fixer.replaceText(node, optimizedRegex);
				}
			});
		}
	};
};

module.exports = {
	create,
	meta: {
		type: 'suggestion',
		docs: {
			url: getDocsUrl(__filename)
		},
		fixable: 'code'
	}
};
