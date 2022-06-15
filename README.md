# HTML Timeline

Keyframe animation timeline for HTML.

# Usage

```html
<object id="example" type="image/svg+xml" data="some.svg"></object>

<timeline repeatCount="2" end="300">
    <timeline-track object="#example" target=".shape">
      
      <keyframe pos="0">
        <keyframe-value type="css" name="display" value="block"></keyframe-value>
      </keyframe>

      <keyframe pos="150">
        <keyframe-value type="css" name="display" value="none"></keyframe-value>
      </keyframe>

      <keyframe pos="300">
        <keyframe-value type="css" name="display" value="block"></keyframe-value>
      </keyframe>

    </timeline-track>
  </timeline>
```

# References

## <timeline> tag
| Attribute   | Description                           | Values             | Default    |
| ----------- | ------------------------------------- | ------------------ | ---------- |
| repeatCount | How many times the timeline will loop | indefinite, Number | indefinite |
| length      | Length of the timeline                | Number             | -          |
| state       | State of the timeline                 | playing, stopped   | -          |

## <timeline-track> tag
| Attribute | Description         | Values   | Default |
| --------- | ------------------- | -------- | ------- |
| object    | Targeted object tag | Selector | -       |
| target    | Targeted element    | Selector | -       |

## <keyframe> tag
| Attribute | Description                              | Values | Default |
| --------- | ---------------------------------------- | ------ | ------- |
| pos       | Position of the keyframe on the timeline | Number | -       |

## <keyframe-value> tag
| Attribute | Description                 | Values         | Default   |
| --------- | --------------------------- | -------------- | --------- |
| type      | Type of the affected value  | css, attribute | attribute |
| name      | Name of the affected value  | String         | -         |
| value     | Value of the affected value | Any            | -         |

# Development

```bash
$ npm i
$ npm run dev
```