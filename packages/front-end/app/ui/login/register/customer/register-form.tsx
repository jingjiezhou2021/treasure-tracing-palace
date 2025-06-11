'use client';
import { lusitana } from '@/app/ui/fonts';
import { useFormik } from 'formik';
import { AtSymbolIcon, KeyIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { Role } from '@/generated/prisma';
import * as Yup from 'yup';
import { registerCustomer as register } from '@/app/lib/actions';
import Link from 'next/link';

export default function RegisterForm() {
	const { replace } = useRouter();
	const searchParams = useSearchParams();
	const validationSchema = Yup.object({
		email: Yup.string().email('邮箱格式不正确').required('必填'),
		name: Yup.string().required('必填'),
		password: Yup.string()
			.min(6, '密码不能少于6位')
			.max(25)
			.required('必填'),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('password')], '两次密码不一致')
			.required('必填'),
	});
	const formik = useFormik({
		initialValues: {
			email: '',
			name: '',
			password: '',
			confirmPassword: '',
			redirectTo: searchParams.get('callbackUrl') || '/dashboard',
			role: Role.CUSTOMER,
		},
		validationSchema,
		onSubmit: async (values) => {
			console.log('注册数据:', values);
			await register(values);
		},
	});
	const renderInput = (
		id: keyof typeof formik.initialValues,
		label: string,
		type = 'text',
		Icon = AtSymbolIcon,
		optional = false,
	) => (
		<div className="mt-4">
			<label
				className="mb-1 block text-xs font-medium text-gray-900"
				htmlFor={id}
			>
				{optional && '（选填）'} {label}
			</label>
			<div className="relative">
				<input
					id={id}
					name={id}
					type={type}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={(formik.values as any)[id]}
					className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
					placeholder={`输入${label}`}
				/>
				<Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
			</div>
			{formik.touched[id] && formik.errors[id] && (
				<p className="mt-1 text-sm text-red-600">{formik.errors[id]}</p>
			)}
		</div>
	);
	return (
		<form onSubmit={formik.handleSubmit} className="space-y-3">
			<div className="flex-1 rounded-lg  px-6 pb-4 pt-8">
				<h1 className={`${lusitana.className} mb-3 text-2xl`}>
					注册以继续.
				</h1>
				<div className="w-full">
					{renderInput('email', '邮箱地址', 'email', AtSymbolIcon)}
					{renderInput('name', '真实姓名', 'text', AtSymbolIcon)}
					{renderInput('password', '密码', 'password', KeyIcon)}
					{renderInput(
						'confirmPassword',
						'确认密码',
						'password',
						KeyIcon,
					)}
				</div>
				<input
					type="hidden"
					name="redirectTo"
					value={formik.values.redirectTo}
					onChange={formik.handleChange}
				/>
				<hr className="mt-4" />
				<Button className="mt-4 w-full">
					注册{' '}
					<ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
				</Button>
				<Link href={'/login'}>
					<Button className="mt-4 w-full" type="button">
						返回登陆{' '}
						<ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
					</Button>
				</Link>
			</div>
		</form>
	);
}
