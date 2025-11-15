import React from 'react';

const EXAMPLE_PROMPTS = [
  { text: 'I run a small retail store and need to track inventory, sales, and customers' },
  { text: 'Create an ERP for my restaurant to manage orders, menu items, and staff schedules' },
  { text: 'I need an ERP for my consulting business to track projects, invoices, and client payments' },
  { text: 'Build an ERP for my manufacturing company to manage production, suppliers, and quality control' },
  { text: 'Create a custom ERP for my e-commerce business to handle products, orders, and shipping' },
  { text: 'I need an ERP for my service business to manage appointments, invoices, and customer history' },
];

export function ExamplePrompts(sendMessage?: { (event: React.UIEvent, messageInput?: string): void | undefined }) {
  return (
    <div id="examples" className="relative flex flex-col gap-9 w-full max-w-3xl mx-auto flex justify-center mt-6">
      <div
        className="flex flex-wrap justify-center gap-2"
        style={{
          animation: '.25s ease-out 0s 1 _fade-and-move-in_g2ptj_1 forwards',
        }}
      >
        {EXAMPLE_PROMPTS.map((examplePrompt, index: number) => {
          return (
            <button
              key={index}
              onClick={(event) => {
                sendMessage?.(event, examplePrompt.text);
              }}
              className="border border-bolt-elements-borderColor rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-900 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary px-3 py-1 text-xs transition-theme"
            >
              {examplePrompt.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
