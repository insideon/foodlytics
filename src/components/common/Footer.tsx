export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* About */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Foodlytics</h3>
            <p className="text-sm text-gray-600">
              음식에 대한 의견을 공유하고
              <br />
              보상을 받으세요!
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">바로가기</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="/survey" className="hover:text-blue-600">
                  설문 참여
                </a>
              </li>
              <li>
                <a href="/leaderboard" className="hover:text-blue-600">
                  리더보드
                </a>
              </li>
              <li>
                <a href="/achievements" className="hover:text-blue-600">
                  업적
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">문의</h3>
            <p className="text-sm text-gray-600">
              이메일: support@foodlytics.com
              <br />
              운영시간: 평일 09:00 - 18:00
            </p>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-sm text-gray-500">
          © 2025 Foodlytics. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
