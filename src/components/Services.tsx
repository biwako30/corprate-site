export default function Services() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-2xl text-blue-600 font-semibold tracking-wide uppercase text-center">事業内容</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            アイデアを活かしたソリューションを提供
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {[
              {
                title: 'ITコンサルティング',
                description: '最新のテクノロジーを活用し、お客様のビジネスを最適化します。戦略立案から実装まで、包括的なサポートを提供します。'
              },
              {
                title: 'システム運用・保守',
                description: 'お客様のニーズに合わせてアプリケーションの安定稼働を支援します。'
              },
              {
                title: 'ボードゲーム制作',
                description: '革新的で盛り上がるボードゲームを、企画から販売まで一気通貫で取り組みます。'
              }
            ].map((service) => (
              <div key={service.title} className="relative bg-white bg-opacity-80 p-6 rounded-lg shadow-md">
                <dt>
                  <p className="text-lg leading-6 font-medium text-gray-900">{service.title}</p>
                </dt>
                <dd className="mt-2 text-base text-gray-700">{service.description}</dd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}