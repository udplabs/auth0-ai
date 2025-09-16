import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.config({
		ignorePatterns: ['lib/db/generated/**'],
		extends: ['next/core-web-vitals', 'next/typescript'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/no-namespace': 'off', // TODO: get rid of namespacing
			'@typescript-eslint/no-unused-vars': 'warn',
		},
	}),
	eslintConfigPrettier,
];

export default eslintConfig;
