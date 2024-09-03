'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function BusinessPage() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('slide-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // ref を設定する関数
  const setSectionRef = (index: number) => (el: HTMLElement | null) => {
    sectionRefs.current[index] = el;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">事業内容</h1>
      
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">常識を超える、革新的なITソリューション</h2>
        <p className="mb-4">
          ロード製作所は、従来の枠を超えた発想と最先端のテクノロジーで、お客様のビジネスに真の変革をもたらします。私たちは、標準的なソリューションだけでなく、独自の複雑な要件にも喜んで挑戦します。
        </p>
      </section>

      <section 
        ref={setSectionRef(0)}
        className="mb-12 transform -translate-x-full opacity-0 transition-all duration-1000 ease-out"
      >
        <h3 className="text-2xl font-semibold mb-4">
          なぜロード製作所が選ばれるのか
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>特殊要件への対応力</strong>: 一般的なベストプラクティスから外れた、独自の複雑な要求にも柔軟に対応</li>
          <li><strong>革新を楽しむ姿勢</strong>: 難しい課題を技術で解決する過程を楽しみ、新しい道を切り開く</li>
          <li><strong>豊富な実績</strong>: 多様な業界での1000件以上のプロジェクト成功実績</li>
          <li><strong>最先端技術の活用</strong>: 常に最新のIT動向をキャッチアップし、革新的なソリューションを提供</li>
          <li><strong>カスタマイズされたアプローチ</strong>: お客様のユニークなビジネスニーズに合わせた柔軟なソリューション設計</li>
        </ul>
      </section>

      <section 
        ref={setSectionRef(1)}
        className="mb-12 transform -translate-x-full opacity-0 transition-all duration-1000 ease-out"
      >
        <h3 className="text-2xl font-semibold mb-4">
          私たちの主要サービス
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold mb-2">1. 戦略的ITコンサルティング</h4>
            <p className="font-bold mb-2">常識にとらわれない、革新的なIT戦略の立案</p>
            <ul className="list-disc pl-6">
              <li>独自のビジネスモデルに合わせたカスタムIT戦略の策定</li>
              <li>従来の枠を超えたデジタルトランスフォーメーション（DX）推進支援</li>
              <li>最新技術と独自アプローチを組み合わせたソリューション提案</li>
              <li>複雑な要件に対応するITインフラストラクチャの設計と最適化</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-2">2. ウェブ＆モバイルアプリケーション開発</h4>
            <p className="font-bold mb-2">独自のアイデアを、使いやすく革新的なアプリケーションに</p>
            <ul className="list-disc pl-6">
              <li>特殊な要件に対応する柔軟なシステム設計</li>
              <li>スケーラブルで高パフォーマンスなバックエンド開発</li>
              <li>独自のユーザー体験を実現する直感的なUI/UXデザイン</li>
              <li>アジャイル開発手法による迅速な開発と継続的な改善</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-2">3. 次世代AI技術：生成AI・RAG開発</h4>
            <p className="font-bold mb-2">AI技術で、前例のないビジネス課題を解決</p>
            <ul className="list-disc pl-6">
              <li>特殊なドメイン知識を活用したカスタム生成AIモデルの開発</li>
              <li>RAG（Retrieval-Augmented Generation）技術を用いた高度な情報処理システム</li>
              <li>複雑なビジネスルールに対応する自然言語処理システム</li>
              <li>大規模かつ複雑なデータ分析と高度な予測モデリング</li>
            </ul>
          </div>
        </div>
      </section>

      <section 
        ref={setSectionRef(2)}
        className="mb-12 transform -translate-x-full opacity-0 transition-all duration-1000 ease-out"
      >
        <h3 className="text-2xl font-semibold mb-4">
          私たちの挑戦的なプロジェクト例
        </h3>
        <ul className="list-decimal pl-6 space-y-2">
          <li><strong>超大規模データ処理システム</strong>: 1日100億件のトランザクションを処理する金融システムの開発</li>
          <li><strong>AI駆動型製造最適化</strong>: 1000以上のパラメータを考慮する工場生産ラインの最適化AIの開発</li>
          <li><strong>マルチモーダルAIアシスタント</strong>: 音声、画像、テキストを統合処理する次世代カスタマーサポートシステムの構築</li>
        </ul>
      </section>

      <section 
        ref={setSectionRef(3)}
        className="mb-12 transform -translate-x-full opacity-0 transition-all duration-1000 ease-out"
      >
        <h3 className="text-2xl font-semibold mb-4">
          新しい挑戦を、ともに
        </h3>
        <p className="mb-4">
          従来のITソリューションでは対応できない課題をお持ちですか？それとも、誰も試したことのない革新的なアイデアを実現したいですか？
          私たちは、そんな挑戦的なプロジェクトを心から歓迎します。技術の限界に挑戦し、新しい可能性を切り開くことこそが、ロード製作所の存在意義です。
        </p>
        <p className="mb-4">
          あなたのビジネスの革新的なアイデアを、最先端のテクノロジーで実現しましょう。
        </p>
        <Link href="/contact" className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
          お問い合わせフォームへ
        </Link>
      </section>
    </div>
  );
}