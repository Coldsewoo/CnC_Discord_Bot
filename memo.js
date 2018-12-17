1.
Loop
    i_Index += 1
Until i > (lines.length)

2.
 FileReadLine, line, C:\My Documents\ContactList.txt, %i_Index%

3.
  Transform, Clipboard, Unicode, %line%

4.
  send, ^v

5.
  id := WinExist("A")
  MsgBox % id

6.
  WinActivate , WinTitle

7.
  Click, 44, 55

  Loop
    i_Index = 1

    WinActivate, Invitelists - Notepad
    FileReadLine, line, C:\My Documents\Invitelists.txt, %i_Index%
    Transform, Clipboard, Unicode, %line%
    WinActivate, Google Chrome ; IOU opened
    Click, 44, 55
    Click, 44, 55
    Click, 44, 55
    Click, 44, 55 ; ... go to the invite tab and be ready for paste
    send, ^v
    Click, 44, 55
    Click, 44, 55 ; click invite and OK
    Click, 44, 55 ; go to area IGN written
    Click, 2	; double Click
    Send {Del}
    WinActivate, Invitelists - notepad ; open notepad

    i_Index += 1

  Until i > (Num of member)
