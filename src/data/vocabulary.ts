export interface VocabWord {
  id: string;
  word: string;
  translation: string;
  pronunciation: string;
  example: string;
  exampleTranslation: string;
  mastery: 'new' | 'learning' | 'reviewing' | 'mastered';
}

export interface VocabUnit {
  courseId: string;
  words: VocabWord[];
}

export const vocabularyData: Record<string, VocabWord[]> = {
  'en-a1-1': [
    { id: 'v1', word: 'hello', translation: '你好', pronunciation: 'həˈloʊ', example: 'Hello, how are you?', exampleTranslation: '你好，你好吗？', mastery: 'new' },
    { id: 'v2', word: 'goodbye', translation: '再见', pronunciation: 'ɡʊdˈbaɪ', example: 'Goodbye, see you tomorrow!', exampleTranslation: '再见，明天见！', mastery: 'new' },
    { id: 'v3', word: 'thank you', translation: '谢谢你', pronunciation: 'θæŋk juː', example: 'Thank you for your help.', exampleTranslation: '谢谢你的帮助。', mastery: 'new' },
    { id: 'v4', word: 'please', translation: '请', pronunciation: 'pliːz', example: 'Please pass me the book.', exampleTranslation: '请把那本书递给我。', mastery: 'new' },
    { id: 'v5', word: 'yes', translation: '是的', pronunciation: 'jɛs', example: 'Yes, I understand.', exampleTranslation: '是的，我明白了。', mastery: 'new' },
    { id: 'v6', word: 'no', translation: '不', pronunciation: 'noʊ', example: 'No, thank you.', exampleTranslation: '不，谢谢。', mastery: 'new' },
    { id: 'v7', word: 'my name is', translation: '我的名字是', pronunciation: 'maɪ neɪm ɪz', example: 'My name is John.', exampleTranslation: '我的名字是约翰。', mastery: 'new' },
    { id: 'v8', word: 'nice to meet you', translation: '很高兴认识你', pronunciation: 'naɪs tuː miːt juː', example: 'Nice to meet you!', exampleTranslation: '很高兴认识你！', mastery: 'new' },
    { id: 'v9', word: 'how are you', translation: '你好吗', pronunciation: 'haʊ ɑːr juː', example: 'How are you today?', exampleTranslation: '你今天好吗？', mastery: 'new' },
    { id: 'v10', word: 'I am fine', translation: '我很好', pronunciation: 'aɪ æm faɪn', example: 'I am fine, thank you.', exampleTranslation: '我很好，谢谢。', mastery: 'new' },
    { id: 'v11', word: 'good morning', translation: '早上好', pronunciation: 'ɡʊd ˈmɔːrnɪŋ', example: 'Good morning everyone!', exampleTranslation: '大家早上好！', mastery: 'new' },
    { id: 'v12', word: 'good night', translation: '晚安', pronunciation: 'ɡʊd naɪt', example: 'Good night, sleep well.', exampleTranslation: '晚安，睡个好觉。', mastery: 'new' },
    { id: 'v13', word: 'welcome', translation: '欢迎', pronunciation: 'ˈwɛlkəm', example: 'Welcome to our school!', exampleTranslation: '欢迎来到我们学校！', mastery: 'new' },
    { id: 'v14', word: 'sorry', translation: '对不起', pronunciation: 'ˈsɑːri', example: 'Sorry, I am late.', exampleTranslation: '对不起，我迟到了。', mastery: 'new' },
    { id: 'v15', word: 'excuse me', translation: '打扰一下', pronunciation: 'ɪkˈskjuːz miː', example: 'Excuse me, where is the bathroom?', exampleTranslation: '打扰一下，洗手间在哪里？', mastery: 'new' },
  ],
  'en-a1-2': [
    { id: 'v16', word: 'one', translation: '一', pronunciation: 'wʌn', example: 'I have one apple.', exampleTranslation: '我有一个苹果。', mastery: 'new' },
    { id: 'v17', word: 'two', translation: '二', pronunciation: 'tuː', example: 'There are two cats.', exampleTranslation: '有两只猫。', mastery: 'new' },
    { id: 'v18', word: 'three', translation: '三', pronunciation: 'θriː', example: 'Three friends played together.', exampleTranslation: '三个朋友一起玩。', mastery: 'new' },
    { id: 'v19', word: 'four', translation: '四', pronunciation: 'fɔːr', example: 'Four seasons in a year.', exampleTranslation: '一年有四个季节。', mastery: 'new' },
    { id: 'v20', word: 'five', translation: '五', pronunciation: 'faɪv', example: 'Five fingers on one hand.', exampleTranslation: '一只手有五根手指。', mastery: 'new' },
    { id: 'v21', word: 'Monday', translation: '星期一', pronunciation: 'ˈmʌndeɪ', example: 'Monday is the first day of the week.', exampleTranslation: '星期一是一周的第一天。', mastery: 'new' },
    { id: 'v22', word: 'Tuesday', translation: '星期二', pronunciation: 'ˈtuːzdeɪ', example: 'I have class on Tuesday.', exampleTranslation: '我星期二有课。', mastery: 'new' },
    { id: 'v23', word: 'Wednesday', translation: '星期三', pronunciation: 'ˈwɛnzdeɪ', example: 'Wednesday is in the middle of the week.', exampleTranslation: '星期三是一周的中间。', mastery: 'new' },
    { id: 'v24', word: 'today', translation: '今天', pronunciation: 'təˈdeɪ', example: 'Today is a sunny day.', exampleTranslation: '今天是晴天。', mastery: 'new' },
    { id: 'v25', word: 'tomorrow', translation: '明天', pronunciation: 'təˈmɑːroʊ', example: 'I will see you tomorrow.', exampleTranslation: '我明天见你。', mastery: 'new' },
  ],
  'jp-a1-1': [
    { id: 'jv1', word: 'あさ', translation: '早上', pronunciation: 'asa', example: 'あさ はんを たべました。', exampleTranslation: '我吃了早餐。', mastery: 'new' },
    { id: 'jv2', word: 'ひる', translation: '中午', pronunciation: 'hiru', example: 'ひる ねました。', exampleTranslation: '我睡了午觉。', mastery: 'new' },
    { id: 'jv3', word: 'よる', translation: '晚上', pronunciation: 'yoru', example: 'よる あめが ふりました。', exampleTranslation: '晚上下了雨。', mastery: 'new' },
    { id: 'jv4', word: 'さんぽ', translation: '散步', pronunciation: 'sanpo', example: 'さんぽを しました。', exampleTranslation: '我散步了。', mastery: 'new' },
    { id: 'jv5', word: 'おんなのこ', translation: '女孩', pronunciation: 'onnanoko', example: 'その おんなのこは わたしです。', exampleTranslation: '那个女孩是我。', mastery: 'new' },
    { id: 'jv6', word: 'おとこのこ', translation: '男孩', pronunciation: 'otokonoko', example: 'おとこのこが います。', exampleTranslation: '有一个男孩。', mastery: 'new' },
    { id: 'jv7', word: 'ひと', translation: '人', pronunciation: 'hito', example: 'ひとが おおいですね。', exampleTranslation: '人真多啊。', mastery: 'new' },
    { id: 'jv8', word: 'みず', translation: '水', pronunciation: 'mizu', example: 'みずを のみました。', exampleTranslation: '我喝了水。', mastery: 'new' },
    { id: 'jv9', word: 'ごはん', translation: '饭', pronunciation: 'gohan', example: 'ごはんを たべました。', exampleTranslation: '我吃了饭。', mastery: 'new' },
    { id: 'jv10', word: 'ほん', translation: '书', pronunciation: 'hon', example: 'ほんを よみました。', exampleTranslation: '我读书了。', mastery: 'new' },
  ],
  'kr-a1-1': [
    { id: 'kv1', word: '안녕하세요', translation: '你好', pronunciation: 'annyeonghaseyo', example: '안녕하세요, 만나서 반갑습니다.', exampleTranslation: '你好，很高兴见到你。', mastery: 'new' },
    { id: 'kv2', word: '감사합니다', translation: '谢谢', pronunciation: 'gamsahamnida', example: '도와줘서 감사합니다.', exampleTranslation: '感谢你的帮助。', mastery: 'new' },
    { id: 'kv3', word: '네', translation: '是的', pronunciation: 'ne', example: '네, 알겠습니다.', exampleTranslation: '是的，我明白了。', mastery: 'new' },
    { id: 'kv4', word: '아니요', translation: '不', pronunciation: 'aniyo', example: '아니요, 괜찮습니다.', exampleTranslation: '不，没关系。', mastery: 'new' },
    { id: 'kv5', word: '좋아요', translation: '好的', pronunciation: 'joayo', example: '좋아요, 해봅시다.', exampleTranslation: '好的，我们做吧。', mastery: 'new' },
    { id: 'kv6', word: '사랑해요', translation: '我爱你', pronunciation: 'saranghaeyo', example: '가족을 사랑해요.', exampleTranslation: '我爱我的家人。', mastery: 'new' },
    { id: 'kv7', word: '친구', translation: '朋友', pronunciation: 'chingu', example: '친구가 많습니다.', exampleTranslation: '我有很多朋友。', mastery: 'new' },
    { id: 'kv8', word: '가족', translation: '家人', pronunciation: 'gajok', example: '가족과 함께 살고 있습니다.', exampleTranslation: '我和家人一起住。', mastery: 'new' },
    { id: 'kv9', word: '밥', translation: '饭', pronunciation: 'bap', example: '밥을 먹었습니다.', exampleTranslation: '我吃了饭。', mastery: 'new' },
    { id: 'kv10', word: '물', translation: '水', pronunciation: 'mul', example: '물을 마셨습니다.', exampleTranslation: '我喝了水。', mastery: 'new' },
  ],
};

export const getVocabularyByUnit = (unitId: string): VocabWord[] => {
  return vocabularyData[unitId] || [];
};

export const getTotalVocabulary = (courseId: string): number => {
  const courseUnits = Object.keys(vocabularyData).filter(key => key.startsWith(courseId));
  return courseUnits.reduce((total, unit) => total + (vocabularyData[unit]?.length || 0), 0);
};
