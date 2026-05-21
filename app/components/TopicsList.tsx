// Topics list component
'use client';

import React from 'react';
import { useStudy } from '@/app/context/StudyContext';

export default function TopicsList() {
  const { topics, deleteTopic } = useStudy();

  if (topics.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {topics.map((topic) => (
        <div
          key={topic.id}
          className="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-800"
        >
          <a
            href={`/topics?topicId=${topic.id}`}
            className="flex-1 text-left text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <p className="font-medium">{topic.name}</p>
          </a>
          <button
            onClick={() => deleteTopic(topic.id)}
            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 ml-2 px-2 py-1 rounded hover:bg-red-100 dark:hover:bg-red-900"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
