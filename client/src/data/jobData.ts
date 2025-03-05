// src/data/jobData.ts
export interface LocationData {
  country: string;
  cities: string[];
}

export interface SalaryInfo {
  location: {
    country: string;
    city: string;
  };
  salaryRange: {
    junior: string;
    middle: string;
    senior: string;
  };
  averageSalary: string;
  currency: string;
}

export interface MarketInfo {
  location: {
    country: string;
    city: string;
  };
  demandLevel: string;
  growthRate: string;
  topCompanies: string[];
  marketTrends: string[];
}

export const jobLocations: Record<string, LocationData[]> = {
  'frontend-engineer': [
    {
      country: 'China',
      cities: ['Beijing', 'Shanghai', 'Shenzhen', 'Hangzhou'],
    },
    {
      country: 'United States',
      cities: ['San Francisco', 'New York', 'Seattle', 'Boston'],
    },
  ],
  'backend-engineer': [
    // ... 后端工程师的地区数据
  ],
};

export const salaryData: Record<string, SalaryInfo[]> = {
  'frontend-engineer': [
    {
      location: {
        country: 'China',
        city: 'Beijing',
      },
      salaryRange: {
        junior: '15-25k',
        middle: '25-35k',
        senior: '35-50k+',
      },
      averageSalary: '30k',
      currency: 'CNY',
    },
    // ... 更多城市的薪资数据
  ],
};

export const marketData: Record<string, MarketInfo[]> = {
  'frontend-engineer': [
    {
      location: {
        country: 'China',
        city: 'Beijing',
      },
      demandLevel: 'High',
      growthRate: '15%',
      topCompanies: ['ByteDance', 'Alibaba', 'Baidu', 'Tencent'],
      marketTrends: [
        '前端工程化需求增长',
        'React框架持续流行',
        '跨平台开发需求上升',
      ],
    },
    // ... 更多城市的市场数据
  ],
};
