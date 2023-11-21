import java.io.IOException;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;

@WebServlet("/Checklist")
public class Checklist extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String selectedPerson = request.getParameter("person");

        // 체크리스트를 검색
        HashMap<String, ArrayList<String>> checklists = (HashMap<String, ArrayList<String>>) request.getSession()
                .getAttribute("checklists");

        // 선택된 사용자가 체크리스트에 있는지 확인
        if (checklists != null && checklists.containsKey(selectedPerson)) {
            // 선택된 사용자의 체크리스트를 검색
            ArrayList<String> selectedPersonChecklist = checklists.get(selectedPerson);

            // 선택된 사용자와 체크리스트를 속성으로 설정
            request.setAttribute("selectedPerson", selectedPerson);
            request.setAttribute("checklist", selectedPersonChecklist);
        } else {
            // 선택된 사용자를 찾지 못한 경우 처리
            response.sendRedirect("index.jsp"); // 메인 페이지로 리디렉션
            return;
        }

        // 선택된 사용자의 체크리스트를 표시하기 위해 index.jsp로 포워딩
        RequestDispatcher dispatcher = request.getRequestDispatcher("index.jsp");
        dispatcher.forward(request, response);
    }
}
