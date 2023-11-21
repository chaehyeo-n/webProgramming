import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/AddChecklistItem")
public class AddChecklistItem extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    	request.setCharacterEncoding("UTF-8");
    	String checklistItem = request.getParameter("checklistItem");
        String selectedPerson = request.getParameter("selectedPerson");

        // 체크리스트를 검색하거나 생성
        HashMap<String, ArrayList<String>> checklists = (HashMap<String, ArrayList<String>>) request
                .getSession().getAttribute("checklists");
        if (checklists == null) {
            checklists = new HashMap<>();
            request.getSession().setAttribute("checklists", checklists);
        }

        // 선택된 사용자의 체크리스트를 검색
        ArrayList<String> checklist = checklists.get(selectedPerson);
        if (checklist == null) {
            // 체크리스트를 찾지 못한 경우 처리
            response.sendRedirect("index.jsp"); // 메인 페이지로 리디렉션
            return;
        }

        // 항목을 체크리스트에 추가
        checklist.add(checklistItem);

        // 업데이트된 체크리스트를 속성으로 설정
        request.setAttribute("checklist", checklist);
        request.setAttribute("selectedPerson", selectedPerson);

        // 업데이트된 체크리스트를 표시하기 위해 index.jsp로 포워딩
        RequestDispatcher dispatcher = request.getRequestDispatcher("index.jsp");
        dispatcher.forward(request, response);
    }
}
