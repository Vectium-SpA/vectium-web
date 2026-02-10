import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Farmateca',
  description: 'Términos y Condiciones de uso de Farmateca',
};

async function getMarkdownContent() {
  const filePath = path.join(process.cwd(), 'public', 'farmateca', 'legal', 'terminos_condiciones_V1.md');
  const content = await fs.readFile(filePath, 'utf-8');
  return content;
}

export default async function TerminosPage() {
  const content = await getMarkdownContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Términos y Condiciones
            </h1>
            <Link
              href="/farmateca/web/app"
              className="text-farmateca-primary hover:text-farmateca-primary-dark dark:text-teal-400 dark:hover:text-teal-300 font-medium transition-colors"
            >
              ← Volver
            </Link>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Última actualización: Enero 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-12">
          <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-white prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-a:text-farmateca-primary dark:prose-a:text-teal-400 hover:prose-a:text-farmateca-primary-dark dark:hover:prose-a:text-teal-300">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </article>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <Link
            href="/farmateca/web/privacidad"
            className="text-farmateca-primary hover:text-farmateca-primary-dark dark:text-teal-400 dark:hover:text-teal-300 font-medium transition-colors"
          >
            Ver Política de Privacidad →
          </Link>
        </div>
      </div>
    </div>
  );
}
