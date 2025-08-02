import { PageConfig } from './configTypes';

const MOCK_DATA: PageConfig = {
  rows: [
    {
      id: 'row-1',
      components: [
        {
          id: 'shape-1',
          componentType: 'rectangle',
          content: "<div class='text-xl md:text-3xl p-0 md:p-4'>Mock api data</div>",
          styleName: 'purple',
          size: 100,
          positioning: 'center',
          animation: 'slideLeft',
        },
      ],
    },
  ],
};

export async function fetchPageConfig(username: string): Promise<PageConfig> {
  // Simulate API delay and error
  await new Promise((res) => setTimeout(res, 300));
  if (username === 'error') throw new Error('Mock API error');
  if (username === 'newuser') return { rows: [] };
  return MOCK_DATA;
}

export async function savePageConfig(username: string, config: PageConfig): Promise<{ success: boolean }> {
  // Simulate API delay and error
  await new Promise((res) => setTimeout(res, 300));
  if (username === 'error') throw new Error('Mock API error');
  return { success: true };
} 