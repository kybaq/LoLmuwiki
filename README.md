# Code Conventions

## **깃허브 규칙**

- main branch 는 배포를 위한 branch 로, 기능이 문제 없이 동작할 때 merge 를 수행한다.
- dev branch 를 생성해, 개발 시에는 dev 를 기반으로 작업한다.
- 브랜치 이름 : 수정 중인 파일/기능 - 생성한 사람(ex. 마이 페이지 작업 시 mypage-kyb)
- 커밋 시에는 수행한 작업 단위로 나눠서 진행, PR 슬랙에 공지하기
- PR 은 팀원 모두(4명)이 코드 리뷰 진행 후 merge 진행
- 코드 리뷰를 기다리는 것이 어려운 경우 팀원들에게 슬랙으로 통보 후 merge 진행 가능

### 깃헙 커밋 규칙

| 작업 타입   | 작업내용                       |
| ----------- | ------------------------------ |
| ✨ update   | 해당 파일에 새로운 기능이 생김 |
| 🎉 add      | 없던 파일을 생성함, 초기 세팅  |
| 🐛 bugfix   | 버그 수정                      |
| ♻️ refactor | 코드 리팩토링                  |
| 🩹 fix      | 코드 수정                      |
| 🚚 move     | 파일 옮김/정리                 |
| 🔥 del      | 기능/파일을 삭제               |
| 🍻 test     | 테스트 코드를 작성             |
| 💄 style    | css                            |
| 🙈 gitfix   | gitignore 수정                 |
| 🔨script    | package.json 변경(npm 설치 등) |

## .prettierrc

```json
{
  "printWidth": 80, // 한 줄의 최대 길이를 80자로 제한합니다.
  "tabWidth": 2, // 들여쓰기에 사용되는 탭의 너비를 2칸으로 설정합니다.
  "useTabs": false, // 들여쓰기에 탭 대신 공백을 사용합니다.
  "semi": true, // 명령문 끝에 세미콜론을 추가합니다.
  "singleQuote": true, // 문자열을 표현할 때 홑따옴표를 사용합니다.
  "quoteProps": "as-needed", // 객체 속성 이름에 따옴표를 필요한 경우에만 추가합니다.
  "jsxSingleQuote": false, // JSX에서 속성 값을 나타낼 때 쌍따옴표를 사용합니다.
  "trailingComma": "all", // 가능한 경우 모든 곳에 후행 쉼표를 추가합니다.
  "bracketSpacing": true, // 객체 리터럴의 중괄호 안에 공백을 추가합니다. 예: { foo: bar }
  "jsxBracketSameLine": false, // JSX에서 마지막 >를 다음 줄에 위치시킵니다. 예:
  // <div
  //   foo="bar"
  // />
  "arrowParens": "always", // 화살표 함수의 매개변수에 항상 괄호를 추가합니다. 예: (x) => x
  "proseWrap": "preserve", // 마크다운 텍스트를 원래대로 유지합니다. Prettier가 강제로 줄바꿈을 하지 않습니다.
  "htmlWhitespaceSensitivity": "css", // HTML 파일에서 공백 처리를 CSS 규칙에 따릅니다.
  "endOfLine": "lf" // 파일 끝의 줄바꿈 문자를 LF (Line Feed, \n)로 설정합니다.
}
```

## prettierrc 옵션 설명

1. printWidth: 80
   한 줄의 최대 길이를 80자로 설정합니다. 이를 초과하는 경우, 적절한 위치에서 줄 바꿈을 합니다.

2. tabWidth: 2
   탭의 너비를 공백 2칸으로 설정합니다. 코드에서 탭을 사용할 때 공백 2칸으로 표시됩니다.

3. useTabs: false
   탭 대신 스페이스를 사용하도록 설정합니다. true로 설정하면 탭을 사용합니다.

4. semi: true
   문장의 끝에 세미콜론(;)을 추가합니다. false로 설정하면 세미콜론을 생략합니다.

5. singleQuote: true
   문자열을 나타낼 때, 작은 따옴표(')를 사용합니다. false로 설정하면 큰 따옴표(")를 사용합니다.

6. quoteProps: 'as-needed'
   객체의 속성에 따옴표를 필요할 때만 사용합니다. 가능한 값은 as-needed, consistent, preserve가 있습니다.

7. jsxSingleQuote: false
   JSX에서 속성 값을 나타낼 때 큰 따옴표(")를 사용합니다. true로 설정하면 작은 따옴표(')를 사용합니다.

8. trailingComma: 'all'
   객체나 배열의 마지막 요소 뒤에 항상 쉼표를 추가합니다. 가능한 값은 none, es5, all이 있습니다.

9. bracketSpacing: true
   객체 리터럴에서 중괄호 사이에 공백을 추가합니다. 예를 들어, { foo: bar }처럼 공백이 추가됩니다. false로 설정하면 {foo: bar}처럼 공백이 제거됩니다.

10. jsxBracketSameLine: false
    JSX 요소의 마지막 >를 다음 줄로 내립니다. true로 설정하면 같은 줄에 유지합니다.
    예시:
    // <div
    // foo="bar"
    // />

11. arrowParens: 'always'
    화살표 함수의 매개변수에 항상 괄호를 추가합니다. 예를 들어, (x) => x처럼 사용합니다. 가능한 값은 always와 avoid가 있습니다.

12. proseWrap: 'preserve'
    마크다운 문서에서 줄 바꿈을 보존합니다. 가능한 값은 always, never, preserve가 있습니다.

13. htmlWhitespaceSensitivity: 'css'
    HTML 파일에서 공백 처리를 CSS의 display 속성에 따릅니다. 가능한 값은 css, strict, ignore가 있습니다.

14. endOfLine: 'lf'
    줄바꿈 문자를 LF(Line Feed, `\n`)로 설정합니다. 다른 가능한 값으로는 crlf (Carriage Return + Line Feed), cr (Carriage Return), auto가 있습니다.
